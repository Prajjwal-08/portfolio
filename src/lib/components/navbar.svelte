<script>
  import { onMount } from "svelte";

  let isMenuOpen = false;

  function toggleMenu() {
    isMenuOpen = !isMenuOpen;
  }

  // Close the menu when the user clicks outside of it
  function handleClickOutside(event) {
    if (isMenuOpen && !event.target.closest(".navbar")) {
      isMenuOpen = false;
    }
  }

  onMount(() => {
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  });
</script>

<nav class="bg-[#131420] bg-opacity-90 sticky top-0 z-50">
  <div class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 navbar">
    <!-- Menu Icon -->
    <div class="relative flex items-center justify-between h-20 px-3">
      <a href="/"><img src="logo.png" alt="" href="/" class=" w-10" /></a>

      <button
        type="button"
        class="menu-icon inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
        on:click={toggleMenu}
        aria-expanded={isMenuOpen}
      >
        <span class="sr-only">Open main menu</span>
        <!-- Menu Icon (Hamburger) -->
        <svg
          class="h-6 w-6"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>
      <!-- Desktop Menu -->
      <div class="desktop-menu hidden sm:block sm:ml-6">
        <div class="flex space-x-4">
          <a
            href="/"
            class="text-white hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            >Home</a
          >
          <a
            href="/about"
            class="text-white hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            >About</a
          >
          <a
            href="/skills"
            class="text-white hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            >Skills</a
          >
          <a
            href="/projects"
            class="text-white hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            >Projects</a
          >
          <!-- <a href="/contact" class="text-white hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Contact</a> -->
          <button
            class="group border-white border-2 w-[130px] h-9 text-center text-white rounded-full"
            onclick="window.location.href='/contact'"
          >
            <h1 class="group-hover:hidden -mt-[2px]">Contact Us</h1>
            <i class="fa fa-envelope-o hidden group-hover:block text-[21px]" />
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- Mobile Menu -->
  <div class="{`mobile-menu ${isMenuOpen ? '' : 'closed'}`} sm:hidden">
    <div class="px-2 pt-2 pb-3 space-y-1">
      <a
        href="/"
        class="text-white hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
        >Home</a
      >
      <a
        href="/about"
        class="text-white hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
        >About</a
      >
      <a
        href="/skills"
        class="text-white hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
        >Skills</a
      >
      <a
        href="/projects"
        class="text-white hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
        >Projects</a
      >
      <a
        href="/contact"
        class="text-white hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
        >Contact</a
      >
    </div>
  </div>
</nav>

<style>
  .navbar {
    position: relative;
  }

  .menu-icon {
    display: none;
  }

  @media (max-width: 640px) {
    .menu-icon {
      display: block;
    }

    .desktop-menu {
      display: none;
    }

    .mobile-menu {
      display: block;
    }

    .mobile-menu.closed {
      display: none;
    }
  }
</style>
