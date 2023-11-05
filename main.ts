import {
	Notice,
	Plugin,
	TFile,
} from "obsidian";


export default class DeleteUntitled extends Plugin {
	async onload() {
		this.registerInterval(
			window.setInterval(() => {
				if (this.app.workspace.getActiveFile()?.name != "Untitled.md") {
					this.app.vault.getAllLoadedFiles().forEach(async file => {
						const isUntitled = file.name == "Untitled.md";

						if (file instanceof TFile) {
							const hasNoContent = await this.app.vault.read(file) == "";

							if (isUntitled && hasNoContent) {
								this.app.vault.delete(file);

								new Notice("Deleted Abandoned Untitled.md File");
							}
						}
					});
				}
			}, 1000)
		);
	}
}
