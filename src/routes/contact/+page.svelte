<script>
  import Navbar from "$lib/components/navbar.svelte";
  import { initializeApp, getApps, getApp } from "firebase/app";
  import { getFirestore, collection, addDoc } from "firebase/firestore";
  import { firebaseConfig } from "./firebaseConfig";
  import { browser } from "$app/environment";

  // Check if Firebase app is initialized
  const firebaseApp = browser && (getApps().length === 0 ? initializeApp(firebaseConfig) : getApp());
  const db = browser && getFirestore();
  const colRef = browser && collection(db, "todos");

  let name = "", email = "", msg = "";
  let error = "";

  const addTodo = async () => {
    // Validate input fields
    if (name.trim() !== "") {
      try {
        // Add form data to Firebase
        await addDoc(colRef, {
          name: name.trim(),
          email: email.trim(),
          message: msg.trim(),
          createdAt: new Date().toISOString(),
        });
        error = ""; // Reset error message if successful
        name = "";
        email = "";
        msg = "";
      } catch (err) {
        error = "Error occurred while submitting the form. Please try again later.";
        console.error(err);
      }
    } else {
      error = "Name is empty";
    }
  };
</script>

<!-- Rest of the HTML and CSS remains unchanged -->

<Navbar/>
<div class="bg-[#131420] h-screen w-full sm:text-lg max-w-[1500px]">
  <div class="flex justify-center pt-20">
    <img class="" src="Vector.png" alt="">
  </div>
  <div class="text-center text-white lg:text-xl md:text-xl sm:text-lg m-auto ">
  <p class="">Optimism is an occupational hazard of programming: feedback is treatment</p>
  <p class="">Connect With Me</p></div>
  
  <div class="lg:flex md:flex   sm:gap-10 sm:mb-96 w-full ">
    <div class="md:mt-8 md:ml-20  md:w-96 h-96">
      <img src="contact.png" alt="" class=""> 
      <div class="text-white text-center text-xl ">Connect With Me on Social Media
        <div  class="flex rounded-full gap-8  justify-center w-full text-slate-100 text-4xl mt-2 ">
          <a href="https://www.behance.net/prajjwalshrimal" target="_blank">
            <i class="fa-brands fa-behance text-3xl hover:scale-125 hover:bg-blue-700 p-1" /></a
          >
          <a href="https://www.linkedin.com/in/prajjwal-shrimal/" target="_blank"
            ><i class="fa fa-linkedin text-3xl hover:scale-125 hover:bg-blue-600 px-1" /></a
          >
          <a href="https://github.com/Prajjwal-08" target="_blank"
            ><i class="fa-brands fa-square-github text-3xl hover:scale-150 hover:bg-black rounded-xl " /></a
          >
          <a href="https://www.instagram.com/_.prajju08._/" target="_blank"
            ><i class="fa fa-instagram text-3xl hover:scale-125 hover:bg-gradient-to-r via-[#FE0665] to-[#D300C5]  from-[#FF7901] rounded-md px-1" /></a
          >
        </div>
      </div>
    </div>

    <div class="w-[30rem] my-10 justify-center bg-slate-200 max-sm:w-[15rem] mx-auto md:w-[20rem] ">
      <p class="text-black font-bold text-3xl text-center italic pt-3">Get in Touch </p>
      <form class=" grid-col gap-6 p-5 m-6   outline-white outline justify-items-center place-items-center w-full bg-[#131420]">
        <div class=" grid grid-flow-row grid-rows-3">
          <label class="block text-gray-200 font-bold text underline leading-10" for="input1">Your Name</label>
          <input class="w-full px-4 py-3  text-white bg-transparent outline-double " bind:value={name} type="text" id="input1" placeholder="Full Name" />
          <label class="block text-gray-200 font-bold underline leading-10" for="input2">Your Email</label>
          <input class="w-full px-4 py-3 rounded-lg text-white  bg-transparent outline-double  " bind:value={email} type="text" id="input2" placeholder="xyz@gmail.com" />
          <label class="block text-gray-200 font-bold underline leading-10" for="textarea1">Message</label>
          <textarea class="w-full px-4 py-3 rounded-lg text-white font-family bg-transparent outline-double  " bind:value={msg} id="textarea1" placeholder="Enter your message"></textarea>
        </div>
        <div class=" text-center gap-2 mt-5">
          <button class="" type="submit" on:click={addTodo} >Submit</button>
        </div>
      </form>
    </div>
    
   
  </div>
</div>

<style>
  button {
  width: 10em;
  position: relative;
  height: 3rem;
  border: 3px ridge #149CEA;
  outline: none;
  background-color: transparent;
  color: white;
  transition: 1s;
  border-radius: 0.3em;
  font-size: 16px;
  font-weight: bold;
}

button::after {
  content: "";
  position: absolute;
  top: -10px;
  left: 3%;
  width: 95%;
  height: 40%;
  background-color: #131420;
  transition: 0.3s;
  transform-origin: center;
}

button::before {
  content: "";
  transform-origin: center;
  position: absolute;
  top: 80%;
  left: 3%;
  width: 95%;
  height: 40%;
  background-color: #131420;
  transition: 0.3s;
}

button:hover::before, button:hover::after {
  transform: scale(0)
}

button:hover {
  box-shadow: inset 0px 0px 25px #1479EA;
}
</style>
