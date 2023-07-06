<script>
    import Navbar from "$lib/components/navbar.svelte"
</script>
<Navbar/>
<div class=" bg-slate-900 h-screen">
    <div class="flex justify-center pt-20">
        <img class="" src="png 23.png" alt="">
    </div>
    <p class="text-white flex justify-center mt-10">Optimism is an occupational hazard of programming:feedback is treatment</p>
    <div class="flex">
            <div class="mt-8 ml-20 w-96 h-96">
                <img src="contact.png" alt="" class=""> 
            </div>
        <div class="w-80 mt-10 ml-40">  
            <form class="flex flex-col gap-20">
                <div class="flex flex-col gap-2">
                        <label class="block text-gray-200 font-bold text-xs" for="input1">Your Name</label>
                        <input class="w-full mb-4 px-4 py-3 rounded-lg text-white font-family bg-transparent border border-gray-700" type="text" id="input1" placeholder="Full Name" />
                      <label class="block text-gray-200 font-bold text-xs" for="input1">Your gmail</label>
                      <input class="w-full mb-4 px-4 py-3 rounded-lg text-white font-family bg-transparent border border-gray-700" type="text" id="input1" placeholder="xyz@gmail.com" />
                    <div class="flex flex-col gap-2">
                        <label class="block text-gray-200 font-bold text-xs" for="textarea1">Message</label>
                        <input class="w-full mb-4 px-4 py-8 rounded-lg text-white font-family bg-transparent border border-gray-700" type="text" id="input1" placeholder="Text Area" />
                    </div>
                      <button class="flex items-center justify-center self-start font-semibold text-gray-700 border border-gray-700 px-8 py-2 text-sm gap-2 mt-2 bg-gray-800 rounded-md hover:bg-white hover:border-white" type="submit">Submit</button>
                </div>
            </form>
        </div>
    </div>
</div>