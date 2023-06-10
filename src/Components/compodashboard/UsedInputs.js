export const Message = ({ label, placeholder, setDescription,setValue }) => {
    return (
        <div className="text-sm w-full">
            <label className="text-border font-semibold">{label}</label>
            <textarea
                className="w-full h-40 mt-2 p-6 bg-main border border-border rounded"
                placeholder={placeholder}
                onChange={(e) => setDescription(e.target.value)}
                value={setValue}
            ></textarea>
        </div>
    );
};

export const Select = ({ label, options, setValue }) => {
    const handleSelectChange = (event) => {
        const selectedValue = event.target.value;
        setValue(selectedValue);
        
    };


    return (
        <>
            <label className="text-border font-semibold">{label}</label>
            <select
                className="w-full mt-2 px-6 py-4 text-text bg-main border border-border"
                onChange={handleSelectChange}

            >
                {options.map((o, i) => {
                    return (
                        <option key={i} value={o.id} >
                            {o.name}
                        </option>
                    )
                })
                }

            </select>

        </>
    );
};

export const Input = ({ label, placeholder, setValue, type, bg, value }) => {
    return (
        <div className="text-sm w-full">
            <label className="text-border font-semibold">{label}</label>
            <input
                required
                type={type}
                placeholder={placeholder}
                className={`w-full text-sm mt-2 p-4 border border-border rounded text-white ${bg ? 'bg-main' : "bg-dry"
                    }`}
                onChange={(e) => { setValue(e.target.value) }}
                value={value}
            />
        </div>
    );
};