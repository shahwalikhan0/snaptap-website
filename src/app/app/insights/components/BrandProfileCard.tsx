import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import dayjs from "dayjs";
import { AdminData, BrandData } from "../types";

interface BrandProfileCardProps {
  admin: AdminData;
  brand: BrandData;
  categoryIcon: string;
}

export function BrandProfileCard({
  admin,
  brand,
  categoryIcon,
}: BrandProfileCardProps) {
  return (
    <motion.div
      className="grid grid-cols-1 lg:grid-cols-3 gap-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1, duration: 0.5, ease: "easeOut" }}
    >
      <div className="relative overflow-hidden bg-gradient-to-br from-[#00A8DE] to-[#005a8c] rounded-3xl shadow-[0_8px_30px_rgb(0,168,222,0.3)] p-8 flex flex-col justify-center items-center text-center lg:col-span-1 group">
        {/* Decorative Background Elements */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-white opacity-10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-[#00d0ff] opacity-20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
        
        <div className="relative z-10">
          <div className="w-24 h-24 rounded-full border-4 border-white/20 bg-white/10 mx-auto mb-4 flex items-center justify-center p-1 backdrop-blur-md shadow-lg">
            {admin.image_url ? (
               <img src={admin.image_url} alt="Profile" className="w-full h-full rounded-full object-cover" />
            ) : (
                <Icon icon="solar:user-circle-bold-duotone" className="text-white text-6xl" />
            )}
          </div>
          <h4 className="text-3xl font-bold text-white mb-1 tracking-tight">{admin.name}</h4>
          <p className="text-[#a8e6ff] font-medium tracking-wide">@{admin.username}</p>
          <div className="mt-5 flex items-center justify-center gap-2 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10 w-max mx-auto shadow-inner">
             <Icon icon="carbon:email" className="text-white text-sm" />
             <span className="text-white text-sm truncate max-w-[180px]">{admin.email}</span>
          </div>
        </div>
      </div>

      <div className="bg-white/70 backdrop-blur-xl border border-white/40 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8 lg:col-span-2 relative overflow-hidden flex flex-col justify-between">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-[#e0f7ff] to-transparent opacity-50 rounded-bl-full pointer-events-none" />
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 relative z-10">
          {/* Plan Info */}
          <div className="space-y-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs uppercase tracking-widest font-bold text-slate-400 mb-1">Current Plan</p>
                <div className="flex items-center gap-3">
                  <p className="text-2xl font-extrabold text-slate-800 tracking-tight">
                    {brand.package_name}
                  </p>
                  <div className={`px-2.5 py-0.5 rounded-md text-[11px] font-bold tracking-wider uppercase border ${
                    brand.status.toLowerCase() === "active"
                      ? "bg-emerald-50 text-emerald-600 border-emerald-200"
                      : "bg-rose-50 text-rose-600 border-rose-200"
                  }`}>
                    {brand.status}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#f0fafe] flex items-center justify-center text-[#00A8DE]">
                <Icon icon={categoryIcon} width={22} />
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest">Industry</p>
                <p className="font-semibold text-slate-700">{brand.category || "N/A"}</p>
              </div>
            </div>
          </div>

          {/* Billing Info */}
          <div className="space-y-6 sm:border-l sm:border-slate-200/60 sm:pl-8">
             <div>
                <p className="text-xs uppercase tracking-widest font-bold text-slate-400 mb-1">Billing Cycle</p>
                <p className="font-semibold text-slate-700 flex items-center gap-2">
                   <Icon icon="solar:calendar-date-bold-duotone" className="text-[#00A8DE] text-lg" />
                   {dayjs().month(brand.month - 1).format('MMMM')} {brand.year}
                </p>
             </div>

             <div className="flex items-center justify-between">
               <div>
                  <p className="text-xs uppercase tracking-widest font-bold text-slate-400 mb-1">Due Date</p>
                  <p className="font-semibold text-slate-700">
                    {brand.due_date ? dayjs(brand.due_date).format("MMM D, YYYY") : "N/A"}
                  </p>
               </div>
               <div className="text-right">
                  <p className="text-xs uppercase tracking-widest font-bold text-slate-400 mb-1">Status</p>
                  <span className={`inline-flex px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                    brand.date_paid
                      ? "bg-emerald-50 text-emerald-600 border border-emerald-100"
                      : "bg-rose-50 text-rose-600 border border-rose-100"
                  }`}>
                    {brand.date_paid ? "Paid" : "Unpaid"}
                  </span>
               </div>
             </div>
          </div>
        </div>

        {/* Total Billing Footer */}
        <div className="mt-8 pt-6 border-t border-slate-200/60 flex items-end justify-between relative z-10">
          <div>
            <p className="text-xs uppercase tracking-widest font-bold text-slate-400 mb-1">Current Balance</p>
            <p className="text-3xl font-black text-[#00A8DE] tracking-tight">
              <span className="text-lg font-bold text-slate-400 mr-1">PKR</span>
              {brand.totalBilling.toLocaleString()}
            </p>
          </div>
          
          <button 
             onClick={() => window.location.href='/app/subscription-page'} 
             className="flex items-center gap-2 text-sm font-bold text-[#00A8DE] hover:text-[#007cae] transition-colors rounded-full hover:bg-[#00A8DE]/5 px-4 py-2"
          >
             Manage Billing <Icon icon="solar:arrow-right-line-duotone" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
