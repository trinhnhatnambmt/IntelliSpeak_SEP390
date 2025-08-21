import { useEffect, useState } from "react";
import { getAllCompaniesAPI } from "~/apis";

const Companies = () => {
    const [companies, setCompanies] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        getAllCompaniesAPI().then((res) => {
            console.log(res);
            setCompanies(res);
        });
    }, []);

    // Hàm lọc danh sách công ty
    const filteredCompanies = companies.filter(
        (company) =>
            company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            company.shortName
                .toLowerCase()
                .includes(searchTerm.toLowerCase()) ||
            (company.description &&
                company.description
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()))
    );

    return (
        <div className="container mx-auto px-6 py-8  min-h-screen relative z-10">
            <div className="mb-6">
                <input
                    type="text"
                    placeholder="Search companies..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full p-2 border border-gray-200 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredCompanies.map((company) => (
                    <div
                        key={company?.companyId}
                        className="rounded-xl p-4 shadow-sm hover:shadow-lg transition border 
                           bg-white border-gray-200 
                           dark:bg-gray-800 dark:border-gray-700 relative z-10"
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <img
                                src={company?.logoUrl}
                                alt={company?.name}
                                className="w-12 h-12 object-contain rounded-md border"
                            />
                            <div>
                                <h2 className="text-base font-semibold">
                                    {company?.name}
                                </h2>
                                <p className="text-sm text-gray-400 dark:text-gray-500">
                                    {company?.shortName}
                                </p>
                            </div>
                        </div>

                        <p className="text-sm mb-4 text-gray-600 dark:text-gray-300 line-clamp-3">
                            {company?.description}
                        </p>

                        <div className="flex flex-wrap gap-2 mt-auto">
                            <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-600 dark:bg-gray-700 dark:text-gray-300">
                                {company?.size || "20-500 employees"}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Companies;
