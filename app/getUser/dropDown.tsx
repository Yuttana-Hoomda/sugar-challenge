
export default function DropDown() {
    
    return (
        <div className="grid">
        <div>
            <select className="justify-center text-white bg-gradient-to-r from-blue to-indigo-900 font-medium rounded-full text-m px-28 py-4 text-center">
                <option value="TEA" className="text-center text-black text-m justify-center">ชานมไข่มุก</option>
                <option value="COFFEE" className="text-center text-black text-m">กาแฟ</option>
                <option value="THAITEA" className="text-center text-black text-m">ชาไทย</option>
                <option value="MILK" className="text-center text-black text-m">นมสด</option>
                <option value="YOGURT" className="text-center text-black text-m">โยเกิร์ต</option>
                <option value="SODA" className="text-center text-black text-m">โซดา</option>
                <option value="JUICE" className="text-center text-black text-m">น้ำผลไม้</option>
                <option value="WATER" className="text-center text-black text-m">น้ำดื่ม</option>
                <option value="BEER" className="text-center text-black text-m">เบียร์</option>
                
            </select>  
        </div>
        <div>
            <select className="justify-center text-white bg-gradient-to-r from-blue to-indigo-900 font-medium rounded-full text-m px-28 py-4 text-center mt-4">  
            <option value="TEA" className="text-center text-black text-m justify-center">ชานมไข่มุก</option>
                <option value="COFFEE" className="text-center text-black text-m">กาแฟ</option>
                <option value="THAITEA" className="text-center text-black text-m">ชาไทย</option>
            </select>  
        </div>
        <div>
            <select className="justify-center text-white bg-gradient-to-r from-blue to-indigo-900 font-medium rounded-full text-m px-28 py-4 text-center mt-4">
            <option value="TEA" className="text-center text-black text-m justify-center">ชานมไข่มุก</option>
                <option value="COFFEE" className="text-center text-black text-m">กาแฟ</option>
                <option value="THAITEA" className="text-center text-black text-m">ชาไทย</option>
            </select>  
        </div>
        </div>
        
    )
    }