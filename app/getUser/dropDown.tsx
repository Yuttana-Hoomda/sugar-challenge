
export default function DropDown() {
    return (
        <div className="grid">
        <div>
            <select className="justify-center text-white bg-gradient-to-r from-blue to-indigo-900 font-medium rounded-full text-m px-28 py-4 text-center">

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