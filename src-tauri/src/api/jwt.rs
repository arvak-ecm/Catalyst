use base64::engine::general_purpose;
use base64::Engine;
use jsonwebtoken::{decode, decode_header, Algorithm, DecodingKey, Validation};
use serde::{Deserialize, Serialize};
use serde_json::Value;
use std::collections::HashMap;
use tauri::plugin::TauriPlugin;
use tauri::Runtime;

#[derive(Debug, Serialize, Deserialize)]
struct Claims {
    sub: Option<String>,
    name: Option<String>,
    iat: Option<usize>,
    exp: Option<usize>,
    #[serde(flatten)]
    extra: HashMap<String, Value>,
}

#[derive(Debug, Serialize)]

struct TokenValidationResult {
    header: Option<jsonwebtoken::Header>,
    payload: Claims,
    #[serde(rename = "decodeBase")]
    decode_base: bool,
    #[serde(rename = "decodeSecurity")]
    decode_security: bool,
    error: Option<String>,
}

pub fn init<R: Runtime>() -> TauriPlugin<R> {
    tracing::info!("Initializing plugin JWT...");
    tauri::plugin::Builder::<R>::new("jwt")
        .invoke_handler(tauri::generate_handler![test, validate])
        .build()
}

#[tauri::command]
async fn test() -> Result<String, String> {
    Ok(("plugin:jwt|validate").to_string())
}

#[tauri::command]
async fn validate(token: String, secret_key: Option<String>) -> TokenValidationResult {
    let header = match decode_header(&token) {
        Ok(h) => Some(h),
        Err(e) => {
            return TokenValidationResult {
                header: None,
                payload: Claims {
                    sub: None,
                    name: None,
                    iat: None,
                    exp: None,
                    extra: HashMap::new(),
                },
                decode_base: false,
                decode_security: false,
                error: Some(format!("Failed to decode header: {}", e)),
            };
        }
    };

    let decoded_payload = match decode_jwt_payload(token.as_str()) {
        Ok(payload) => match serde_json::from_slice::<Claims>(&payload.to_string().into_bytes()) {
            Ok(claims) => claims,
            Err(_e) => Claims {
                sub: None,
                name: None,
                iat: None,
                exp: None,
                extra: HashMap::new(),
            },
        },
        Err(e) => {
            return TokenValidationResult {
                header: None,
                payload: Claims {
                    sub: None,
                    name: None,
                    iat: None,
                    exp: None,
                    extra: HashMap::new(),
                },
                decode_base: false,
                decode_security: false,
                error: Some(format!("Failed to decode payload: {}", e)),
            };
        }
    };

    if let Some(key) = secret_key {
        return decode_by_secret(token, key, decoded_payload, header.unwrap());
    }

    TokenValidationResult {
        header,
        payload: decoded_payload,
        decode_base: true,
        decode_security: false,
        error: Some("Secret key not provided, token not validated.".to_string()),
    }
}

fn decode_jwt_payload(token: &str) -> Result<Value, String> {
    let parts: Vec<&str> = token.split('.').collect();
    if parts.len() != 3 {
        return Err("INVALID_JWT".to_string());
    }

    let padded_payload = add_padding(parts[1]);
    let decoded_payload = general_purpose::URL_SAFE
        .decode(padded_payload)
        .map_err(|e| format!("Failed to decode payload: {}", e))?;

    //log::info!("decoded_payload: {:?}", decoded_payload);
    let payload: Value = serde_json::from_slice(&decoded_payload)
        .map_err(|e| format!("Failed to parse JSON: {}", e))?;

    //log::info!("Payload: {:?}", payload);

    Ok(payload)
}

fn decode_by_secret(
    token: String,
    secret_key: String,
    decoded_payload: Claims,
    header: jsonwebtoken::Header,
) -> TokenValidationResult {
    let decoding_key = DecodingKey::from_secret(secret_key.as_bytes());

    let mut validation = Validation::new(Algorithm::HS256);
    validation.validate_exp = false;
    validation.set_required_spec_claims(&["sub"]);

    let token_data = decode::<Claims>(&token, &decoding_key, &validation);

    TokenValidationResult {
        header: Some(header),
        payload: decoded_payload,
        decode_base: true,
        decode_security: token_data.is_ok(),
        error: token_data.err().map(|e| e.to_string()),
    }
}

fn add_padding(base64_str: &str) -> String {
    let mut padded = base64_str.to_string();
    while padded.len() % 4 != 0 {
        padded.push('=');
    }
    padded
}
