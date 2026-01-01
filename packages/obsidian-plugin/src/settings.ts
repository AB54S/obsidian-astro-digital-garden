import { App, PluginSettingTab, Setting } from 'obsidian';
import type SpaceshipPlugin from './main';

export interface SpaceshipSettings {
	blogRepoPath: string;
	assetsFolder: string;
}

export const DEFAULT_SETTINGS: SpaceshipSettings = {
	blogRepoPath: '',
	assetsFolder: 'src/assets'
}

export class SpaceshipSettingTab extends PluginSettingTab {
	plugin: SpaceshipPlugin;

	constructor(app: App, plugin: SpaceshipPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const {containerEl} = this;

		containerEl.empty();

		containerEl.createEl('h2', {text: 'Astro Digital Garden Settings'});

		new Setting(containerEl)
			.setName('Blog Repository Path')
			.setDesc('Absolute path to your Astro blog repository (e.g., /Users/me/Documents/my-blog)')
			.addText(text => text
				.setPlaceholder('/path/to/repo')
				.setValue(this.plugin.settings.blogRepoPath)
				.onChange(async (value) => {
					this.plugin.settings.blogRepoPath = value;
					await this.plugin.saveSettings();
				}));
        
        new Setting(containerEl)
			.setName('Assets Folder')
			.setDesc('Folder in the repo to store images (relative to repo root)')
			.addText(text => text
				.setPlaceholder('src/assets')
				.setValue(this.plugin.settings.assetsFolder)
				.onChange(async (value) => {
					this.plugin.settings.assetsFolder = value;
					await this.plugin.saveSettings();
				}));
	}
}

