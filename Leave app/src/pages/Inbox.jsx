import User from "../userImg.png";
const view = () => {
  return (
    <>
      <section id="inbox">
        <div className="p-4 sm:ml-64">
          <div className="p-4 border-2 border-[#4a9dc9] h-auto border-dashed rounded-lg dark:border-gray-700 mt-16 ">
            <h1 className="text-3xl text-center py-5">Inbox </h1>
            <div class="flex items-center gap-5 border-2 m-2 border-[#4a9dc9] rounded-lg p-2 ">
              <img class="w-8 h-8 rounded-full" src={User} alt="" />
              <div class="flex flex-col w-full leading-1.5">
                <div class="flex items-center  space-x-2 rtl:space-x-reverse">
                  <span class="text-sm font-semibold text-gray-900 dark:text-white"></span>
                  <span class="text-sm font-normal text-gray-500 dark:text-gray-400"></span>
                </div>
                <div class="flex items-center  space-x-2 rtl:space-x-reverse">
                  <span class="text-sm font-normal text-gray-500 dark:text-gray-400">
                    From
                  </span>
                  <span class="text-sm font-normal text-gray-500 dark:text-gray-400">
                    To:
                  </span>
                </div>
                <p class="text-sm font-normal py-2 text-gray-900 dark:text-white"></p>
                <p></p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default view;
