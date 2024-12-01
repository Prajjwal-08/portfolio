<script>
  import Navbar from "$lib/components/navbar.svelte";
  let num = 0;
  var arr = ["WEB DEVELOPER", "WEB DESIGNER", "FREELANCER", "FULL STACK WEB DEVELOPER"];

  const interval = setInterval(function () {
    if (num < 2) {
      num = num + 1;
    } else {
      num = 0;
    }
  }, 6000);
</script>

<Navbar />
<div class="flex max-sm:grid p-8 pt-10 w-full m-auto">
  <div class="left max-sm:w-full">
    <h2
      class="text-3xl font-medium bg-bglr text-transparent bg-clip-text flex gap-2 text-white"
    >
      Who I am ?
    </h2>
    <h1
      class="text-4xl font-medium text-white whitespace-nowrap max-sm:text-lg"
      style="text-transform: uppercase;"
    >
      Prajjwal Shrimal
      <div
        style="width: fit-content;"
        class=" w-fit text-transparent bg-clip-text bg-gradient-to-r from-[#1cdce8] via-[#bb77ed] to-[#f34a62] animate-typing whitespace-nowrap border-r-4 border-r-white"
      >
        {arr[num]}
      </div>
    </h1>
    <!-- from-[#1cdce8] via-[#bb77ed] to-[#f34a62] -->
    <p class="text-medium text-left mt-8 text-white">
      I'm Prajjwal Shrimal, a passionate web developer with expertise in PHP,
      Laravel, CodeIgniter, and WordPress. I thrive on solving complex problems
      and creating user-friendly web experiences using HTML, CSS, and
      JavaScript. With a strong foundation in web development, I constantly stay
      updated with the latest industry trends and technologies. I excel in both
      frontend and backend development, database management, and API
      integration.
    </p>
    <p class="text-medium text-left mt-8 text-white">
      I enjoy collaborating with diverse teams, exchanging ideas, and learning
      from others. My goal as a web developer is to create clean and efficient
      code that meets technical standards and resonates with users on a deeper
      level. I am committed to delivering high-quality, scalable solutions that
      enhance user experience. If you're seeking a dedicated, creative, and
      reliable web developer, let's work together to create something amazing!
    </p>
    <a href="cv-Prajjwal-Shrimal.pdf" class="button mt-12 tracking-wide" download>
      <span class="button__text">Download CV</span>
      <span class="button__icon"
        ><svg
          class="svg"
          data-name="Layer 2"
          id="bdd05811-e15d-428c-bb53-8661459f9307"
          viewBox="0 0 35 35"
          xmlns="http://www.w3.org/2000/svg"
          ><path
            d="M17.5,22.131a1.249,1.249,0,0,1-1.25-1.25V2.187a1.25,1.25,0,0,1,2.5,0V20.881A1.25,1.25,0,0,1,17.5,22.131Z"
          /><path
            d="M17.5,22.693a3.189,3.189,0,0,1-2.262-.936L8.487,15.006a1.249,1.249,0,0,1,1.767-1.767l6.751,6.751a.7.7,0,0,0,.99,0l6.751-6.751a1.25,1.25,0,0,1,1.768,1.767l-6.752,6.751A3.191,3.191,0,0,1,17.5,22.693Z"
          /><path
            d="M31.436,34.063H3.564A3.318,3.318,0,0,1,.25,30.749V22.011a1.25,1.25,0,0,1,2.5,0v8.738a.815.815,0,0,0,.814.814H31.436a.815.815,0,0,0,.814-.814V22.011a1.25,1.25,0,1,1,2.5,0v8.738A3.318,3.318,0,0,1,31.436,34.063Z"
          /></svg
        ></span
      >
    </a>
  </div>
  <!-- <div class="right w-1/2 relative max-sm:w-full">
    <img
      src="bgh.png"
      alt="All icons"
      class="absolute z-20 h-[500px] bottom-0 top-10 right-20 sm:right-0 max-sm:relative max-sm:right-0 hidden md:block" 
    />
  </div> -->
</div>
<div class="mt-12 px-10 text-white">
  <ol class="items-center md:w-fit gap-20">
    <h1 class="text-center text-2xl my-2 w-full">Qualifications</h1>
    <!-- Hidden -->
    <li class="relative mb-6 sm:mb-0 h-full sm:w-64 max-sm:w-40 hidden">
      <h2 class="mb-5 text-xl">High School</h2>
      <div class="lg:flex md:flex sm:block">
        <div>
          <div class="flex items-center">
            <div
              class="z-10 flex items-center justify-center w-10 h-10 bg-white rounded-full ring-0 ring-white sm:ring-8 dark:ring-gray-900 shrink-0"
            >
              <i class="fa-solid fa-school-circle-check text-blue-800" />
            </div>
            <div
              class="hidden sm:flex w-full bg-gray-200 h-0.5 dark:bg-gray-700"
            />
          </div>
        </div>
        <div>
          <div class="mt-5 w-96 max-sm:w-40">
            <div
              class="box w-64 max-sm:w-40 p-4 border border-white border-opacity-40 rounded-2xl text-center"
            >
              <h3 class="text-xl font-semibold mb-2">High School</h3>
              <h3 class="text-base mb-2">Vidyasthali Public School</h3>
              <h3 class="text-sm mb-3">
                Completed <strong>12th</strong> in commerce stream
              </h3>
              <time
                class="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500"
                >2019 - 2020</time
              >
            </div>
          </div>
        </div>
      </div>
    </li>
    <!-- Graduate -->
    <li class="relative sm:w-64 max-sm:w-60 mb-6 sm:mb-10 h-full">
      <div class="lg:flex md:flex sm:block">
        <div class="">
         
            <div class="flex items-center">
              <div
                class="z-10 flex items-center justify-center w-10 h-10 bg-white rounded-full ring-0 ring-white sm:ring-8 dark:ring-gray-900 shrink-0"
              >
                <i class="fa-solid fa-user-graduate text-blue-800" />
              </div>
              <div class=" sm:flex w-full bg-gray-200 h-0.5 dark:bg-gray-700" />
            </div>

          <div class="mt-5 w-96 max-sm:w-80">
            <div
              class="box w-64 max-sm:w-80 p-4 border border-white border-opacity-40 rounded-2xl text-center"
            >
              <h3 class="text-xl font-semibold mb-2">Graduation</h3>
              <h3 class="text-base mb-2">JECRC University</h3>
              <h3 class="text-sm mb-3">
                <strong>Bachelors in Computer Application</strong> with specialisation
                in Data Science
              </h3>
              <time
                class="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500"
                >2021 - 2023</time
              >
            </div>
          </div>
        </div>

        <div class="">
          <div class="flex items-center">
            <div
              class="z-10 flex items-center justify-center w-10 h-10 bg-white rounded-full ring-0 ring-white sm:ring-8 dark:ring-gray-900 shrink-0"
            >
              <i class="fa-solid fa-user-graduate text-blue-800" />
            </div>
            <div class=" sm:flex w-full bg-gray-200 h-0.5 dark:bg-gray-700" />
          </div>
          <div class="mt-5 w-96 max-sm:w-80">
            <div
              class="box w-64 max-sm:w-80 p-4 border border-white border-opacity-40 rounded-2xl text-center"
            >
              <h3 class="text-xl font-semibold mb-2">Post Graduation</h3>
              <h3 class="text-base mb-2">Manipal University</h3>
              <h3 class="text-sm mb-3">
                Persuing <strong>Masters in Computer Application</strong>
              </h3>
              <time
                class="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500"
                >2023 - 2025</time
              >
            </div>
          </div>
        </div>
      </div>
    </li>

    <!-- Internship -->
    <!-- Graduate -->
    <h1 class="text-center text-2xl my-2 w-full">Experiences</h1>
    <li class="relative sm:w-64 max-sm:w-40 mb-10 sm:mb-10 h-full flex">
      <div class="lg:flex md:flex sm:block">
        <div>
          <div class="flex items-center">
            <div
              class="z-10 flex items-center justify-center w-10 h-10 bg-white rounded-full ring-0 ring-white sm:ring-8 dark:ring-gray-900 shrink-0"
            >
              <i class="fa-solid fa-user-graduate text-blue-800" />
            </div>
            <div class=" sm:flex w-full bg-gray-200 h-0.5 dark:bg-gray-700" />
          </div>
          <div class="mt-5 w-96 max-sm:w-100">
            <div
              class="box w-64 max-sm:w-100 p-4 border border-white border-opacity-40 rounded-2xl text-center"
            >
              <h3 class="text-xl font-semibold mb-2">Internship</h3>
              <h3 class="text-base mb-2">TensaX Inovation Lab</h3>
              <h3 class="text-sm mb-3">
                Completed internship as a <br />
                <strong>Web Developer Intern</strong> using Svelte & Tailwind
              </h3>
              <time
                class="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500"
                >Jan, 2023 - June, 2023</time
              >
            </div>
          </div>
        </div>
        <div>
          <div class="flex items-center">
            <div
              class="z-10 flex items-center justify-center w-10 h-10 bg-white rounded-full ring-0 ring-white sm:ring-8 dark:ring-gray-900 shrink-0"
            >
              <i class="fa-solid fa-user-graduate text-blue-800" />
            </div>
            <div class=" sm:flex w-full bg-gray-200 h-0.5 dark:bg-gray-700" />
          </div>
          <div class="mt-5 w-96 max-sm:w-40">
            <div
              class="box w-64 max-sm:w-100 p-4 border border-white border-opacity-40 rounded-2xl text-center"
            >
              <h3 class="text-xl font-semibold mb-2">Full Stack Developer</h3>
              <h3 class="text-base mb-2">Programmates Pvt Ltd</h3>
              <h3 class="text-sm mb-3">
                I develop dynamic websites with PHP, Laravel, CodeIgniter,
                WordPress, and Shopify.
              </h3>
              <time
                class="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500"
                >Aug, 2023 - Present</time
              >
            </div>
          </div>
        </div>
      </div>
    </li>
    <!-- hidden -->
    <li class="relative sm:w-64 max-sm:w-40 mb-6 sm:mb-0 h-80 hidden">
      <h2 class="mb-5 text-xl">Internship</h2>
      <div class="flex items-center">
        <div
          class="z-10 flex items-center justify-center w-10 h-10 bg-white rounded-full ring-0 ring-white sm:ring-8 dark:ring-gray-900 shrink-0"
        >
          <i class="fa-solid fa-building text-blue-800" />
        </div>
        <div class="hidden sm:flex w-full bg-gray-200 h-0.5 dark:bg-gray-700" />
      </div>
      <div class="mt-5 w-96 max-sm:w-40">
        <div
          class="box w-64 max-sm:w-40 p-4 border border-white border-opacity-40 rounded-2xl text-center"
        >
          <h3 class="text-xl font-semibold mb-2">Internship</h3>
          <h3 class="text-base mb-2">TensaX Inovation Lab</h3>
          <h3 class="text-sm mb-3">
            Completed internship as a <br />
            <strong>Web Developer Intern</strong> using Svelte & Tailwind
          </h3>
          <time
            class="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500"
            >Jan, 2023 - June, 2023</time
          >
        </div>
      </div>
    </li>
  </ol>
</div>

<style>
  .button {
    --main-focus: #2d8cf0;
    --font-color: #dedede;
    --bg-color-sub: #222;
    --bg-color: #323232;
    --main-color: #dedede;
    position: relative;
    width: 200px;
    height: 40px;
    cursor: pointer;
    display: flex;
    align-items: center;
    border: 2px solid var(--main-color);
    box-shadow: 4px 4px var(--main-color);
    background-color: var(--bg-color);
    border-radius: 10px;
    overflow: hidden;
  }

  .button,
  .button__icon,
  .button__text {
    transition: all 0.3s;
  }

  .button .button__text {
    transform: translateX(21px);
    color: var(--font-color);
    font-weight: 600;
  }

  .button .button__icon {
    position: absolute;
    transform: translateX(140px);
    height: 100%;
    width: 60px;
    background-color: var(--bg-color-sub);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .button .svg {
    width: 20px;
    fill: var(--main-color);
  }

  .button:hover {
    background: var(--bg-color);
  }

  .button:hover .button__text {
    color: transparent;
  }

  .button:hover .button__icon {
    width: 200px;
    transform: translateX(0);
  }

  .button:active {
    transform: translate(3px, 3px);
    box-shadow: 0px 0px var(--main-color);
  }
  * {
    box-sizing: border-box;
  }

  .message {
    color: #ffffff;
    display: block;
    font-weight: 900;
    overflow: hidden;
    position: absolute;
    top: 0.2rem;
    left: 440px;
    animation: openclose 5s ease-in-out infinite;
  }

  .word1,
  .word2 {
    font-family: tahoma;
  }

  @keyframes openclose {
    0% {
      top: 0.2rem;
      width: 0;
    }
    5% {
      width: 0;
    }
    15% {
      width: 300px;
    }
    30% {
      top: 0.2rem;
      width: 300px;
    }
    33% {
      top: 0.2rem;
      width: 0;
    }
    35% {
      top: 0.2rem;
      width: 0;
    }
    38% {
      top: -4.5rem;
    }
    48% {
      top: -4.5rem;
      width: 300px;
    }
    62% {
      top: -4.5rem;
      width: 300px;
    }
    66% {
      top: -4.5rem;
      width: 0;
      text-indent: 0;
    }
    71% {
      top: -9rem;
      width: 0;
      text-indent: 5px;
    }
    86% {
      top: -9rem;
      width: 285px;
    }
    95% {
      top: -9rem;
      width: 285px;
    }
    98% {
      top: -9rem;
      width: 0px;
      text-indent: 5px;
    }
    100% {
      top: 0;
      width: 0;
      text-indent: 0;
    }
  }
</style>
