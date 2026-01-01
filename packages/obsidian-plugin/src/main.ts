import * as fs from 'fs';
import { MarkdownView, Notice, Plugin } from 'obsidian';
import * as path from 'path';
import { DEFAULT_SETTINGS, SpaceshipSettings, SpaceshipSettingTab } from './settings';

// We need to use node's fs module, but Obsidian's API might abstract it.
// However, for copying to an external path, we definitely need standard fs/path.

export default class SpaceshipPlugin extends Plugin {
	settings: SpaceshipSettings;

	async onload() {
		await this.loadSettings();

		// Icon in the left ribbon
		const ribbonIconEl = this.addRibbonIcon('rocket', 'Astro Digital Garden', (evt: MouseEvent) => {
			this.publishCurrentNote();
		});

		// Command to publish current note
		this.addCommand({
			id: 'publish-current-note',
			name: 'Digital Garden: Publish Current Note',
			checkCallback: (checking: boolean) => {
				const markdownView = this.app.workspace.getActiveViewOfType(MarkdownView);
				if (markdownView) {
					if (!checking) {
						this.publishCurrentNote();
					}
					return true;
				}
				return false;
			}
		});
        
        // Command to publish all notes (stub)
        this.addCommand({
            id: 'publish-all-notes',
            name: 'Publish All Notes',
            callback: () => {
                new Notice('Publishing all notes is not yet implemented.');
            }
        });

		this.addSettingTab(new SpaceshipSettingTab(this.app, this));
	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}

    async publishCurrentNote() {
        const view = this.app.workspace.getActiveViewOfType(MarkdownView);
        if (!view) {
            new Notice('No active markdown file open.');
            return;
        }

        const file = view.file;
        if (!file) return;

        const blogPath = this.settings.blogRepoPath;
        if (!blogPath) {
            new Notice('Please configure the Blog Repository Path in settings.');
            return;
        }

        // 1. Read content
        const content = await this.app.vault.read(file);
        
        // 2. Prepare destination path
        // We assume posts go into src/content/posts
        const destDir = path.join(blogPath, 'src/content/posts');
        const destFile = path.join(destDir, file.name);

        try {
            // Ensure destination directory exists (using node fs)
            if (!fs.existsSync(destDir)) {
                fs.mkdirSync(destDir, { recursive: true });
            }

            // 3. Write file
            // Note: In a real plugin, we might want to process the content here 
            // (e.g. fix image links, update frontmatter)
            const processedContent = await this.processContent(content, file.path, blogPath);
            
            fs.writeFileSync(destFile, processedContent);
            
            new Notice(`Successfully published: ${file.name}`);
        } catch (error) {
            console.error('Spaceship Publish Error:', error);
            new Notice(`Error publishing file: ${error.message}`);
        }
    }
    
    async processContent(content: string, sourcePath: string, blogPath: string): Promise<string> {
        // This function handles image extraction and link fixing
        // For the minimal version, we just return content.
        // TODO: Implement image copying and link rewriting
        
        // Example: Find [[image.png]] and copy image.png to assets folder
        return content;
    }
}

