<script>
   import Navbar from "$lib/components/navbar.svelte";
</script>

<Navbar />

<div class="text-center pt-20 max-sm:pt-5 md:pt-5">
  <p class="text-4xl sm:text-5xl text-white font-medium">Projects</p>
</div>

<div class="flex flex-col items-center justify-center">
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mx-4 sm:mx-10 text-white mb-10 flex-class">

    <!-- Astrology Web -->
    <div class="pt-10 font-medium text-center boxes">
      <div class="backdrop-blur bg-white bg-opacity-40 rounded-xl p-4">
        <a href="https://valuationupdates.com/astrologer/">
          <img src="astrologer.jpg" class="w-full rounded-xl img-class mb-4" />
        </a>
        <p class="p-3 text-xl">Astrology Web</p>
        <span class="block mb-3">
          "A WordPress-based astrology platform offering horoscope services, appointment booking, and a modern responsive UI."
        </span>
        <a class="mt-3 button" href="https://valuationupdates.com/astrologer/">
          <i class="fab fa-github text" /> Visit Project
        </a>
      </div>
    </div>

    <!-- File Management System -->
    <div class="pt-10 font-medium text-center boxes">
      <div class="backdrop-blur bg-white bg-opacity-40 rounded-xl p-4">
        <a href="https://github.com/Prajjwal-08/File-Management-System">
          <img src="file-mgmt.jpeg" class="w-full rounded-xl img-class mb-4" />
        </a>
        <p class="p-3 text-xl">File Management System</p>
        <span class="block mb-3">
          "A Laravel solution for secure file handling, user roles, folder management, and admin controls."
        </span>
        <a class="mt-3 button" href="https://github.com/Prajjwal-08/File-Management-System">
          <i class="fab fa-github text" /> GitHub
        </a>
      </div>
    </div>

    <!-- King Joinery (Rewritten) -->
    <div class="pt-10 font-medium text-center boxes">
      <div class="backdrop-blur bg-white bg-opacity-40 rounded-xl p-4">
        <a href="#">
          <img src="king joinery.png" class="w-full rounded-xl img-class mb-4" />
        </a>
        <p class="p-3 text-xl">King Joinery</p>
        <span class="block mb-3">
          "A premium joinery and carpentry service website featuring a clean aesthetic, service showcase, and custom-built responsive layouts."
        </span>
        <a class="mt-3 button" href="#">
          <i class="fab fa-github text" /> View Project
        </a>
      </div>
    </div>

    <!-- IPL E-commerce Customer Panel -->
    <div class="pt-10 font-medium text-center boxes">
      <div class="backdrop-blur bg-white bg-opacity-40 rounded-xl p-4">
        <a href="#">
          <img src="IPL.png" class="w-full rounded-xl img-class mb-4" />
        </a>
        <p class="p-3 text-xl">IPL – E-commerce (Customer Panel)</p>
        <span class="block mb-3">
          "A Laravel-based e-commerce system where I built the complete customer interface including login, product listing, cart flow, and order management."
        </span>
        <a class="mt-3 button" href="#">
          <i class="fab fa-github text" /> View Project
        </a>
      </div>
    </div>

    <!-- Booking Management System -->
    <div class="pt-10 font-medium text-center boxes">
      <div class="backdrop-blur bg-white bg-opacity-40 rounded-xl p-4">
        <a href="#">
          <img src="booking-management-ssytem.png" class="w-full rounded-xl img-class mb-4" />
        </a>
        <p class="p-3 text-xl">Booking Management System</p>
        <span class="block mb-3">
          "A full Laravel scheduling ecosystem featuring meetings, rescheduling, QR-based check-ins, logs, calendars, notifications, and retailer–rep workflows."
        </span>
        <a class="mt-3 button" href="#">
          <i class="fab fa-github text" /> View Project
        </a>
      </div>
    </div>

    <!-- OMyBills (Merged Bills App + Bills API) -->
    <div class="pt-10 font-medium text-center boxes">
      <div class="backdrop-blur bg-white bg-opacity-40 rounded-xl p-4">
        <a href="#">
          <img src="omybills.png" class="w-full rounded-xl img-class mb-4" />
        </a>
        <p class="p-3 text-xl">OMyBills (App + API)</p>
        <span class="block mb-3">
          "A complete bills management ecosystem: a React Native app for tracking bills, reminders & categories, paired with a secure Node.js API featuring authentication, bill CRUD operations, and organized category endpoints."
        </span>
        <a class="mt-3 button" href="#">
          <i class="fab fa-github text" /> View Project
        </a>
      </div>
    </div>

  </div>
</div>

<style>
  .boxes, .boxes .backdrop-blur {
    width: 100%;
    max-width: 450px;
    min-height: 450px;
  }

  .flex-class {
    justify-content: center;
  }

  .button {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px 15px;
    gap: 15px;
    background-color: #181717;
    outline: 3px #181717 solid;
    outline-offset: -3px;
    border-radius: 5px;
    cursor: pointer;
    transition: 400ms;
  }

  .button:hover {
    background-color: transparent;
  }

  .button:hover .text {
    color: #181717;
  }
  .img-class{
    max-height:280px;
    object-fit:contain;
  }
</style>
