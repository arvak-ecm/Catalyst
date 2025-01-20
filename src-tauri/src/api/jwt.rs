use jsonwebtoken::{decode, decode_header, DecodingKey, Validation, Algorithm};
use serde::{Deserialize, Serialize};
use std::time::{SystemTime, UNIX_EPOCH};
use tauri::plugin::TauriPlugin;
use tauri::Runtime;
// Estructura para el encabezado del token
#[derive(Debug, Serialize, Deserialize)]
struct Header {
    alg: String,
    typ: String,
}

// Estructura para el payload del JWT
#[derive(Debug, Serialize, Deserialize)]
struct Claims {
    sub: String,
    name: String,
    iat: usize, // Tiempo de emisión en formato Unix
    exp: Option<usize>, // Opcional para soportar tokens sin expiración
}

// Resultado final que incluye el encabezado, el payload y la validez
#[derive(Debug, Serialize)]
struct TokenValidationResult {
    header: Header,
    payload: Claims,
    is_valid: bool,
    is_not_expired: bool,
}


pub fn init<R: Runtime>() -> TauriPlugin<R> {
	tracing::info!("Initializing plugin JWT...");
  tauri::plugin::Builder::<R>::new("jwt")
    .invoke_handler(tauri::generate_handler![
			test,
  	  validate
    ])
    .build()
}

#[tauri::command]
async fn test() -> Result<String, String> {
  Ok(("plugin:jwt|validate").to_string())
}


#[tauri::command]
async fn validate(
    token: String,
    secret_key: Option<String>,
) -> Result<TokenValidationResult, String> {
    let key = secret_key.unwrap_or_else(|| "your-256-bit-secret".to_string());

    let decoding_key = DecodingKey::from_secret(key.as_bytes());

    // Decodificar el encabezado del token
    let header = decode_header(&token).map_err(|e| e.to_string())?;

		 // Configurar validación sin 'exp'
    let mut validation = Validation::new(Algorithm::HS256);
    validation.validate_exp = false;

		// Validar el token y decodificar el payload
    let token_data = decode::<Claims>(&token, &decoding_key, &validation)
        .map_err(|e| e.to_string())?;

    // Validar si el token está expirado
    let current_time = SystemTime::now()
        .duration_since(UNIX_EPOCH)
        .map_err(|e| e.to_string())?
        .as_secs();
    let is_not_expired = match token_data.claims.exp {
        Some(exp) => exp > current_time as usize,
        None => true, // Si no tiene expiración, es válido
    };

    Ok(TokenValidationResult {
        header: Header {
            alg: format!("{:?}", header.alg),
            typ: header.typ.unwrap_or_else(|| "unknown".to_string()),
        },
        payload: token_data.claims,
        is_valid: true,
        is_not_expired,
    })
}

 