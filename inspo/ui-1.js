import React, { useState } from 'react';

const App = () => {
  const [activeTab, setActiveTab] = useState('scan');

  const heroIconStyle = {
    width: '32px',
    height: '32px',
    opacity: 0.7
  };

  const headerAvatarStyle = {
    width: '32px',
    height: '32px',
    backgroundColor: '#000',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
    fontSize: '12px',
    fontWeight: '600',
    cursor: 'pointer'
  };

  const wellnessIconStyle = {
    width: '40px',
    height: '40px',
    backgroundColor: 'rgba(52, 199, 89, 0.1)',
    color: '#34C759',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0
  };

  return (
    <div style={{ 
      margin: 0,
      padding: 0,
      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
      backgroundColor: '#FFFFFF',
      color: '#000000',
      overflowX: 'hidden',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      paddingBottom: '100px'
    }}>
      <header className="pt-6 px-6 pb-2 flex justify-between items-end h-[60px]">
        <div className="text-sm font-semibold text-[#8E8E93] uppercase tracking-wider">Today</div>
        <div style={headerAvatarStyle}>MR</div>
      </header>

      <h1 className="text-[34px] font-bold tracking-tight px-6 py-4 m-0">Summary</h1>

      <div className="px-6 flex flex-col gap-6">
        <div className="w-full rounded-[20px] p-6 relative overflow-hidden flex flex-col justify-between text-[#000000] shadow-[0_4px_12px_rgba(0,0,0,0.05),0_1px_2px_rgba(0,0,0,0.02)]" style={{
          aspectRatio: '1.586',
          background: 'radial-gradient(circle at 0% 0%, rgba(224,195,252,0.8) 0%, rgba(255,255,255,0) 50%), radial-gradient(circle at 100% 0%, rgba(255,223,211,0.8) 0%, rgba(255,255,255,0) 50%), radial-gradient(circle at 100% 100%, rgba(255,249,196,0.8) 0%, rgba(255,255,255,0) 60%), radial-gradient(circle at 0% 100%, rgba(142,197,252,0.4) 0%, rgba(255,255,255,0) 50%), linear-gradient(135deg, #ffffff 0%, #f8f8f8 100%)'
        }}>
          <div style={{
            content: '',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(120deg, rgba(255,255,255,0.3), rgba(255,255,255,0))',
            zIndex: 1
          }}></div>
          
          <div className="relative z-[2]">
            <div className="flex justify-between items-start">
              <svg style={heroIconStyle} viewBox="0 0 24 24">
                <path d="M12,2C8.13,2 5,5.13 5,9C5,14.25 12,22 12,22C12,22 19,14.25 19,9C19,5.13 15.87,2 12,2M12,11.5A2.5,2.5 0 0,1 9.5,9A2.5,2.5 0 0,1 12,6.5A2.5,2.5 0 0,1 14.5,9A2.5,2.5 0 0,1 12,11.5Z" fill="#000"></path>
              </svg>
              <div style={{
                width: '24px',
                height: '24px',
                border: '2px solid rgba(0,0,0,0.1)',
                borderRadius: '50%'
              }}></div>
            </div>
            
            <div className="mt-auto">
              <div className="text-[15px] font-medium text-[rgba(0,0,0,0.6)] mb-1">Lunch • 12:45 PM</div>
              <div className="text-[28px] font-bold mb-[2px]">682 kcal</div>
              <div className="text-[13px] text-[rgba(0,0,0,0.4)] font-medium">Roasted Chicken Salad</div>
            </div>
          </div>
          
          <div className="absolute bottom-6 right-6 flex gap-1 items-end h-[30px] z-[2]">
            <div className="w-[6px] bg-[rgba(0,0,0,0.1)] rounded-sm" style={{ height: '12px' }}></div>
            <div className="w-[6px] bg-[rgba(0,0,0,0.1)] rounded-sm" style={{ height: '18px' }}></div>
            <div className="w-[6px] bg-[rgba(0,0,0,0.6)] rounded-sm" style={{ height: '24px' }}></div>
            <div className="w-[6px] bg-[rgba(0,0,0,0.1)] rounded-sm" style={{ height: '14px' }}></div>
            <div className="w-[6px] bg-[rgba(0,0,0,0.1)] rounded-sm" style={{ height: '8px' }}></div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-[20px] shadow-[0_2px_10px_rgba(0,0,0,0.04)] border border-[rgba(0,0,0,0.03)] flex flex-col justify-between min-h-[140px]">
            <div>
              <div className="text-[13px] font-semibold text-[#8E8E93] mb-2">Protein</div>
              <div className="text-[26px] font-[650] tracking-tight text-[#000000] mb-[2px]">42g</div>
              <div className="text-xs text-[#8E8E93] font-medium">35% of goal</div>
            </div>
            <div className="mt-auto h-2 bg-[#F2F2F7] rounded overflow-hidden w-full relative">
              <div className="h-full rounded bg-[#AF52DE]" style={{ width: '65%' }}></div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-[20px] shadow-[0_2px_10px_rgba(0,0,0,0.04)] border border-[rgba(0,0,0,0.03)] flex flex-col justify-between min-h-[140px]">
            <div>
              <div className="text-[13px] font-semibold text-[#8E8E93] mb-2">Carbs</div>
              <div className="text-[26px] font-[650] tracking-tight text-[#000000] mb-[2px]">28g</div>
              <div className="text-xs text-[#8E8E93] font-medium">22% of goal</div>
            </div>
            <div className="mt-auto h-2 bg-[#F2F2F7] rounded overflow-hidden w-full relative">
              <div className="h-full rounded bg-[#FF9500]" style={{ width: '45%' }}></div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-[20px] shadow-[0_2px_10px_rgba(0,0,0,0.04)] border border-[rgba(0,0,0,0.03)] flex flex-col justify-between min-h-[140px]">
            <div>
              <div className="text-[13px] font-semibold text-[#8E8E93] mb-2">Fat</div>
              <div className="text-[26px] font-[650] tracking-tight text-[#000000] mb-[2px]">18g</div>
              <div className="text-xs text-[#8E8E93] font-medium">15% of goal</div>
            </div>
            <div className="mt-auto h-2 bg-[#F2F2F7] rounded overflow-hidden w-full relative">
              <div className="h-full rounded bg-[#34C759]" style={{ width: '30%' }}></div>
            </div>
          </div>

          <div className="bg-black text-white p-4 rounded-[20px] shadow-[0_2px_10px_rgba(0,0,0,0.04)] border border-[rgba(0,0,0,0.03)] flex flex-col justify-center items-center min-h-[140px]">
            <div className="text-center">
              <svg viewBox="0 0 24 24" className="w-7 h-7 mx-auto mb-2 fill-white">
                <path d="M4 4h16v16H4z" fill="none"></path>
                <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 9h-2V7h2v5zm0 4h-2v-2h2v2z"></path>
              </svg>
              <div className="font-semibold text-sm">Scan Meal</div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-[20px] shadow-[0_2px_10px_rgba(0,0,0,0.04)] border border-[rgba(0,0,0,0.03)]">
          <div className="mb-6">
            <div className="text-[13px] font-semibold text-[#8E8E93] mb-2">Weekly Activity</div>
            <div className="text-xs text-[#8E8E93] font-medium">Avg 2,100 kcal</div>
          </div>
          
          <div className="flex justify-between items-end h-[100px] pb-[5px]">
            <div className="flex flex-col items-center gap-2">
              <div className="w-[6px] bg-[#F2F2F7] rounded-[3px] relative" style={{ height: '60px' }}>
                <div className="absolute bottom-0 left-0 right-0 rounded-[3px] bg-[#AF52DE]" style={{ height: '40%' }}></div>
              </div>
              <div className="text-[11px] text-[#8E8E93] font-medium">M</div>
            </div>

            <div className="flex flex-col items-center gap-2">
              <div className="w-[6px] bg-[#F2F2F7] rounded-[3px] relative" style={{ height: '60px' }}>
                <div className="absolute bottom-0 left-0 right-0 rounded-[3px] bg-[#FF9500]" style={{ height: '65%' }}></div>
              </div>
              <div className="text-[11px] text-[#8E8E93] font-medium">T</div>
            </div>

            <div className="flex flex-col items-center gap-2">
              <div className="w-[6px] bg-[#F2F2F7] rounded-[3px] relative" style={{ height: '60px' }}>
                <div className="absolute bottom-0 left-0 right-0 rounded-[3px] bg-[#34C759]" style={{ height: '45%' }}></div>
              </div>
              <div className="text-[11px] text-[#8E8E93] font-medium">W</div>
            </div>

            <div className="flex flex-col items-center gap-2">
              <div className="w-[6px] bg-[#F2F2F7] rounded-[3px] relative" style={{ height: '60px' }}>
                <div className="absolute bottom-0 left-0 right-0 rounded-[3px] bg-[#AF52DE]" style={{ height: '80%' }}></div>
              </div>
              <div className="text-[11px] text-[#8E8E93] font-medium">T</div>
            </div>

            <div className="flex flex-col items-center gap-2">
              <div className="w-[6px] bg-[#F2F2F7] rounded-[3px] relative" style={{ height: '60px' }}>
                <div className="absolute bottom-0 left-0 right-0 rounded-[3px] bg-[#FF9500]" style={{ height: '50%' }}></div>
              </div>
              <div className="text-[11px] text-[#8E8E93] font-medium">F</div>
            </div>

            <div className="flex flex-col items-center gap-2">
              <div className="w-[6px] bg-[#F2F2F7] rounded-[3px] relative" style={{ height: '60px' }}>
                <div className="absolute bottom-0 left-0 right-0 rounded-[3px] bg-[#34C759]" style={{ height: '70%' }}></div>
              </div>
              <div className="text-[11px] text-[#8E8E93] font-medium">S</div>
            </div>

            <div className="flex flex-col items-center gap-2">
              <div className="w-[6px] bg-[#F2F2F7] rounded-[3px] relative" style={{ height: '60px' }}>
                <div className="absolute bottom-0 left-0 right-0 rounded-[3px] bg-[#AF52DE]" style={{ height: '30%' }}></div>
              </div>
              <div className="text-[11px] text-[#8E8E93] font-medium">S</div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-[20px] shadow-[0_2px_10px_rgba(0,0,0,0.04)] border border-[rgba(0,0,0,0.03)] flex items-start gap-4">
          <div style={wellnessIconStyle}>
            <svg viewBox="0 0 24 24" className="w-5 h-5">
              <path d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7zm2.85 11.1l-.85.6V16h-4v-2.3l-.85-.6C7.8 12.16 7 10.63 7 9c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.63-.8 3.16-2.15 4.1z"></path>
            </svg>
          </div>
          <div className="flex-1">
            <div className="text-[11px] uppercase tracking-widest text-[#8E8E93] font-semibold mb-1">Cimas Health Group</div>
            <div className="text-[15px] leading-[1.4] text-[#000000] font-medium">Adding leafy greens to your lunch can improve iron absorption by 15%.</div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-[30px] left-0 right-0 flex justify-center z-[100]" style={{ pointerEvents: 'none' }}>
        <nav className="p-[6px] rounded-[100px] flex items-center gap-1 shadow-[0_8px_24px_rgba(0,0,0,0.12)]" style={{
          background: 'rgba(255, 255, 255, 0.85)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.5)',
          pointerEvents: 'auto'
        }}>
          <a 
            href="#" 
            className={`px-5 py-[10px] rounded-[30px] text-sm font-semibold no-underline transition-all duration-200 flex items-center gap-[6px] ${activeTab === 'scan' ? 'bg-black text-white' : 'text-[#8E8E93]'}`}
            onClick={(e) => { e.preventDefault(); setActiveTab('scan'); }}
          >
            <svg className="w-[18px] h-[18px] block fill-current" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="3.2"></circle>
              <path d="M9 2L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-3.17L15 2H9zm3 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z"></path>
            </svg>
            Scan
          </a>
          <a 
            href="#" 
            className={`px-5 py-[10px] rounded-[30px] text-sm font-semibold no-underline transition-all duration-200 flex items-center gap-[6px] ${activeTab === 'stats' ? 'bg-black text-white' : 'text-[#8E8E93]'}`}
            onClick={(e) => { e.preventDefault(); setActiveTab('stats'); }}
          >
            <svg className="w-[18px] h-[18px] block fill-current" viewBox="0 0 24 24">
              <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"></path>
            </svg>
            Stats
          </a>
          <a 
            href="#" 
            className={`px-5 py-[10px] rounded-[30px] text-sm font-semibold no-underline transition-all duration-200 flex items-center gap-[6px] ${activeTab === 'profile' ? 'bg-black text-white' : 'text-[#8E8E93]'}`}
            onClick={(e) => { e.preventDefault(); setActiveTab('profile'); }}
          >
            <svg className="w-[18px] h-[18px] block fill-current" viewBox="0 0 24 24">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"></path>
            </svg>
            Profile
          </a>
        </nav>
      </div>
    </div>
  );
};

export default App;