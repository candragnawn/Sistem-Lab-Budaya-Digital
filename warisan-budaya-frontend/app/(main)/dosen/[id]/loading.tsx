import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="min-h-screen bg-[#F5F7FA] relative pb-20">
      {/* Sub-Navbar */}
      <div className="w-full bg-white py-3 border-b border-slate-100 text-center text-sm md:text-[15px] font-medium relative z-20">
        <span className="text-[#1E40AF] hover:underline cursor-pointer">Universitas Udayana</span>
        <span className="text-slate-300 mx-2">/</span>
        <span className="text-slate-500">Laboratorium Warisan Budaya Digital</span>
      </div>

      {/* Background Banner */}
      <div className="absolute top-[45px] left-0 right-0 h-64 bg-slate-200 z-0 animate-pulse"></div>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-16">
        <Card className="bg-white rounded-xl shadow-sm border-0 overflow-hidden mb-8">
          <CardContent className="p-0">
            <div className="p-8 flex flex-col md:flex-row gap-8 items-start md:items-center">
              
  
              <div className="flex-shrink-0">
                <Skeleton className="w-32 h-32 rounded-full" />
              </div>

              <div className="flex-grow space-y-4">
                <Skeleton className="h-8 w-64" />
                
                <div className="flex flex-wrap items-center gap-4">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-4 w-40" />
                </div>
                
                <div className="flex flex-wrap gap-2 pt-2">
                  <Skeleton className="h-6 w-24 rounded-full" />
                  <Skeleton className="h-6 w-28 rounded-full" />
                  <Skeleton className="h-6 w-32 rounded-full" />
                  <Skeleton className="h-6 w-20 rounded-full" />
                </div>
              </div>
              <div className="flex flex-col gap-3 min-w-[200px]">
                <Skeleton className="h-11 w-full" />
                <Skeleton className="h-11 w-full" />
              </div>
            </div>

            <div className="border-t border-slate-100 px-8 flex gap-8">
              <Skeleton className="h-6 w-32 my-4" />
              <Skeleton className="h-6 w-24 my-4" />
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="space-y-6">
            
            <Card className="rounded-xl shadow-sm border-slate-100 bg-white">
              <CardHeader className="pb-2 pt-5 px-6 border-b border-slate-50 mb-4">
                <Skeleton className="h-6 w-40" />
              </CardHeader>
              <CardContent className="px-6 pb-6">
                <div className="grid grid-cols-2 gap-4">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="border border-slate-100 rounded-lg p-4 flex flex-col items-center justify-center space-y-3">
                      <Skeleton className="h-3 w-16" />
                      <Skeleton className="h-8 w-12" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-xl shadow-sm border-slate-100 bg-white">
              <CardHeader className="pb-4 pt-5 px-6">
                <Skeleton className="h-6 w-40" />
              </CardHeader>
              <CardContent className="px-8 pb-8">
                <div className="space-y-8 ml-4 border-l-2 border-slate-100 pl-6">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="flex items-center gap-3 relative">
                      <div className="absolute -left-[33px] w-4 h-4 rounded-full bg-slate-200 border-4 border-white"></div>
                      <Skeleton className="h-6 w-12" />
                      <Skeleton className="h-8 w-24" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

          </div>

          <div className="lg:col-span-2 space-y-6">
            <Card className="rounded-xl shadow-sm border-slate-100 bg-white h-full">
              <CardHeader className="flex flex-row items-center justify-between pb-4 pt-5 px-6 border-b border-slate-50 mb-2">
                <Skeleton className="h-6 w-40" />
                <Skeleton className="h-4 w-20" />
              </CardHeader>
              <CardContent className="px-6 pb-6 pt-2 space-y-4">
                
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="border border-slate-100 rounded-xl p-5 flex justify-between items-start gap-4">
                    <div className="space-y-3 flex-grow">
                      <Skeleton className="h-5 w-3/4" />
                      <Skeleton className="h-4 w-1/2" />
                      <div className="flex gap-4 pt-2">
                        <Skeleton className="h-6 w-12" />
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-4 w-24" />
                      </div>
                    </div>
                    <div className="flex-shrink-0 w-16 h-16">
                      <Skeleton className="w-full h-full rounded-lg" />
                    </div>
                  </div>
                ))}

              </CardContent>
            </Card>
          </div>
        </div>
        
      </div>
    </div>
  );
}
