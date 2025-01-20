use tauri::Manager;
use tauri_plugin_log::{fern::colors::ColoredLevelConfig, Target, TargetKind};
// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
use native_dialog::{MessageDialog, MessageType};

mod api;

#[cfg(target_os = "macos")]
mod macos;

#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    let log = tauri_plugin_log::Builder::default()
        .targets([
            Target::new(TargetKind::Stdout),
            Target::new(TargetKind::LogDir { file_name: None }),
            Target::new(TargetKind::Webview),
        ])
        .with_colors(ColoredLevelConfig::default())
        .level(log::LevelFilter::Debug);

    let mut builder = tauri::Builder::default();

    builder = builder
        .plugin(tauri_plugin_single_instance::init(
            |app_handle, _argc, _cwd| {
                let windows = app_handle.webview_windows();
                if let Some(windows) = windows.values().next() {
                    let _ = windows.set_focus();
                }
            },
        ))
        .plugin(tauri_plugin_os::init())
        .plugin(tauri_plugin_shell::init())
        .plugin(tauri_plugin_fs::init())
        .plugin(tauri_plugin_http::init())
        .plugin(tauri_plugin_store::Builder::default().build())
        .plugin(log.build())
				.plugin(api::jwt::init())
        .invoke_handler(tauri::generate_handler![
					greet
				]);

    #[cfg(target_os = "macos")]
    {
        // builder = builder.plugin(macos::window_ext::init());
    }
		tracing::info!("Initializing app...");
    let app = builder.build(tauri::generate_context!());

    match app {
        Ok(app) => {
            app.run(|_app_handle, _event| {
                // Your custom event handler
            });
        }
        Err(e) => {
            MessageDialog::new()
                .set_type(MessageType::Error)
                .set_title("Initialization error")
                .set_text(&format!(
                    "Cannot initialize application due to an error:\n{:?}",
                    e
                ))
                .show_alert()
                .unwrap();

            tracing::error!("Error while running tauri application: {:?}", e);
            panic!("{1}: {:?}", e, "error while running tauri application")
        }
    }
}
