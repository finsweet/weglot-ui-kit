# Webflow-Weglot Language Switcher

A JavaScript utility to manage language switchers in Webflow using the Weglot translation API. This script ensures that language dropdowns are initialized correctly and update their appearance when the active language changes.

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Getting Started](#getting-started)
- [Usage](#usage)

## Project Overview

This project integrates Weglot's multilingual functionality with custom dropdown elements in Webflow, providing seamless language switching for websites. It ensures that:
- Language switchers are correctly initialized upon page load.
- The active language is displayed in the dropdown.
- Flags and text of the language options update when switching between languages.

## Features

- **Seamless Integration**: Works with Weglot's translation API.
- **Dynamic Language Switcher**: Updates dropdowns based on the selected language.
- **Customizable**: Modify the structure of the dropdowns to suit your Webflow design.

## Getting Started

### Prerequisites

- A Webflow project with language dropdowns set up.
- A Weglot account with Weglot's JavaScript library included in your Webflow project.

### Setup

1. **Include Weglot Script**: Add the Weglot script to your Webflow project as specified in the [Weglot documentation](https://weglot.com/documentation).
2. **Add Custom Code**: Copy Weglot library and dropdowns.js file into the custom code section of your Webflow project.
3. **Setup Dropdown Elements**: In your Webflow project, ensure that your dropdown elements use the attribute `weglot="dropdown"`.

### Script Structure

- `initializeSwitchers()`: Prepares each dropdown for language switching.
- `updateSwitcherLanguage()`: Updates the active language and corresponding flags/texts when a new language is selected.

## Usage

1. **Initialization**: The script automatically initializes the dropdowns when the Weglot library is ready.
2. **Switching Languages**: Users can switch languages using the dropdown. When a language is selected, the text and flag of the dropdown toggle update to reflect the new language.
3. **Customizing Dropdowns**: Make sure each language option in the dropdown uses the `lang` attribute to specify its language code (e.g., `lang="en"` for English).
