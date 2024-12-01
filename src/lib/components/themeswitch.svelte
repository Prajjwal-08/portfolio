<!-- ThemeSwitcher.svelte -->

<script>
    let isDarkTheme = false; // Initially, the theme is light
    let themeClass = 'light-theme'; // Default theme class
    let themeButtonClass = 'theme-switch-button';
  
    function toggleTheme() {
      isDarkTheme = !isDarkTheme;
      themeClass = isDarkTheme ? 'dark-theme' : 'light-theme';
      themeButtonClass = isDarkTheme ? 'theme-switch-button-dark' : 'theme-switch-button-light';
  
      // Save the theme preference in local storage or cookies if needed
      // localStorage.setItem('theme', themeClass);
      // Use this if you want to persist the theme preference
    }
  </script>
  
  <button class={themeButtonClass} on:click={toggleTheme}>
    Toggle Theme
  </button>
  
  <style>
    .light-theme {
      /* Light theme styles */
      --background-color: #FFFFFF;
      --text-color: #000000;
    }
  
    .dark-theme {
      /* Dark theme styles */
      --background-color: #1E1E1E;
      --text-color: #FFFFFF;
    }
  
    .theme-switch-button {
      /* Default button style */
      background-color: var(--background-color);
      color: var(--text-color);
    }
  
    .theme-switch-button-dark {
      /* Dark theme button style */
      background-color: #333;
      color: #fff;
    }
  
    .theme-switch-button-light {
      /* Light theme button style */
      background-color: #ccc;
      color: #000;
    }
  </style>
  