use tauri_build::{DefaultPermissionRule, InlinedPlugin};

fn main() {
		tauri_build::try_build(
		tauri_build::Attributes::new()
		.codegen(tauri_build::CodegenContext::new())
		.plugin(
    	"jwt",
      InlinedPlugin::new()
      .commands(&[
				"test",
				"validate",
      ])
      .default_permission(
        DefaultPermissionRule::AllowAllCommands,
      ),
    )
	)
  .expect("Failed to run tauri-build");
  //  tauri_build::build()
}
