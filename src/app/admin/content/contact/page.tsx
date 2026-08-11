export default function ContactContentManager() {
  return (
    <div className="max-w-4xl pb-20">
      <div className="mb-12 border-b border-gray-200 dark:border-zinc-900 pb-8 flex justify-between items-end">
        <div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tighter mb-2">
            Contact Settings
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm font-light">
            Manage the information displayed on your public contact page.
          </p>
        </div>
        <button className="bg-black dark:bg-white text-white dark:text-black px-6 py-3 text-xs font-black uppercase tracking-widest hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors flex items-center gap-2">
          Save Changes
        </button>
      </div>

      <div className="space-y-12">
        
        {/* Core Contact Data */}
        <section className="bg-white dark:bg-[#111] border border-gray-200 dark:border-zinc-800 p-8">
          <h3 className="text-sm font-black uppercase tracking-widest mb-6 border-l-2 border-black dark:border-white pl-4">
            Core Data
          </h3>
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Main Headline</label>
              <input type="text" className="w-full bg-gray-50 dark:bg-[#0a0a0a] border border-gray-200 dark:border-zinc-800 px-4 py-3 text-2xl font-black tracking-tighter focus:outline-none focus:border-black dark:focus:border-white" defaultValue="Let's work together." />
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Public Email Address</label>
                <input type="email" className="w-full bg-gray-50 dark:bg-[#0a0a0a] border border-gray-200 dark:border-zinc-800 px-4 py-3 text-sm focus:outline-none focus:border-black dark:focus:border-white" defaultValue="hassanraza03097477849@gmail.com" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Phone Number</label>
                <input type="text" className="w-full bg-gray-50 dark:bg-[#0a0a0a] border border-gray-200 dark:border-zinc-800 px-4 py-3 text-sm focus:outline-none focus:border-black dark:focus:border-white" defaultValue="0309-7477849" />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Location String</label>
              <input type="text" className="w-full bg-gray-50 dark:bg-[#0a0a0a] border border-gray-200 dark:border-zinc-800 px-4 py-3 text-sm focus:outline-none focus:border-black dark:focus:border-white" defaultValue="Karachi, Pakistan" />
            </div>
          </div>
        </section>

        {/* Social Links */}
        <section className="bg-white dark:bg-[#111] border border-gray-200 dark:border-zinc-800 p-8">
          <h3 className="text-sm font-black uppercase tracking-widest mb-6 border-l-2 border-black dark:border-white pl-4">
            Social & External Links
          </h3>
          <div className="space-y-4">
            
            <div className="flex gap-4 items-center">
              <div className="w-12 h-12 flex items-center justify-center bg-gray-50 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800">
                <i className="fa-brands fa-github text-xl"></i>
              </div>
              <div className="flex-1 space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">GitHub URL</label>
                <input type="url" className="w-full bg-gray-50 dark:bg-[#0a0a0a] border border-gray-200 dark:border-zinc-800 px-4 py-2 text-sm focus:outline-none focus:border-black dark:focus:border-white" defaultValue="https://github.com/hassanraza" />
              </div>
            </div>

            <div className="flex gap-4 items-center">
              <div className="w-12 h-12 flex items-center justify-center bg-gray-50 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 text-blue-600 dark:text-blue-500">
                <i className="fa-brands fa-linkedin text-xl"></i>
              </div>
              <div className="flex-1 space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">LinkedIn URL</label>
                <input type="url" className="w-full bg-gray-50 dark:bg-[#0a0a0a] border border-gray-200 dark:border-zinc-800 px-4 py-2 text-sm focus:outline-none focus:border-black dark:focus:border-white" defaultValue="https://linkedin.com/in/hassanraza" />
              </div>
            </div>

          </div>
        </section>

      </div>
    </div>
  );
}
