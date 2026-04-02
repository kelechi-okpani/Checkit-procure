export default function GlobalLoading() {
  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-12 lg:p-16">
      <div className="max-w-7xl mx-auto space-y-12">
        
     
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
          <div className="space-y-4">
    
            <div className="h-6 w-32 bg-indigo-100/50 animate-pulse rounded-full border border-indigo-100" />
            
            <div className="space-y-2">
          
              <div className="h-14 w-64 md:w-80 bg-slate-200 animate-pulse rounded-2xl" />
           
              <div className="h-4 w-full max-w-md bg-slate-200/70 animate-pulse rounded-lg" />
            </div>
          </div>

       
          <div className="w-full lg:max-w-xl flex gap-3">
            <div className="flex-1 h-12 bg-white border border-slate-200 animate-pulse rounded-2xl" />
            <div className="w-32 md:w-48 h-12 bg-white border border-slate-200 animate-pulse rounded-2xl" />
          </div>
        </div>

   
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {[...Array(8)].map((_, i) => (
            <div 
              key={i} 
              className="bg-white rounded-[2rem] border border-slate-200 p-5 space-y-5 shadow-sm"
            >
      
              <div className="aspect-square bg-slate-100 animate-pulse rounded-[1.5rem]" />
              
              <div className="space-y-3">
        
                <div className="h-3 w-12 bg-indigo-100 animate-pulse rounded-full" />
                <div className="h-6 w-3/4 bg-slate-200 animate-pulse rounded-lg" />
                
        
                <div className="flex gap-2">
                  <div className="h-6 w-16 bg-slate-100 animate-pulse rounded-md" />
                  <div className="h-6 w-16 bg-slate-100 animate-pulse rounded-md" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}