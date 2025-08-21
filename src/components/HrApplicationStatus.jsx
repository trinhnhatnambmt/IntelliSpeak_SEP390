import React, { useState, useEffect } from "react";
import { getHrApplicationStatusAPI } from "~/apis";
import { SquareChartGantt, CheckCircle, XCircle, Clock, AlertCircle, Building2, Phone, Globe, Linkedin, FileText as FileTextIcon, Calendar, Eye, ChevronLeft, ChevronRight } from "lucide-react";

const HrApplicationStatus = () => {
    const [hrStatus, setHrStatus] = useState(null);
    const [cvPages, setCvPages] = useState([]);
    const [currentCvPage, setCurrentCvPage] = useState(0);

    useEffect(() => {
        const fetchHrStatus = async () => {
            try {
                const res = await getHrApplicationStatusAPI();
                setHrStatus(res?.data || null);
                if (res?.data?.cvUrl) {
                    const pages = res.data.cvUrl.split(';').filter(page => page.trim() !== '');
                    setCvPages(pages);
                }
            } catch {
                setHrStatus(null);
            }
        };
        fetchHrStatus();
    }, []);

    const getStatusInfo = (status) => {
        switch (status?.toLowerCase()) {
            case 'approved':
                return { icon: CheckCircle, color: 'text-green-600', bgColor: 'bg-green-100' };
            case 'rejected':
                return { icon: XCircle, color: 'text-red-600', bgColor: 'bg-red-100' };
            case 'pending':
                return { icon: Clock, color: 'text-yellow-600', bgColor: 'bg-yellow-100' };
            default:
                return { icon: AlertCircle, color: 'text-gray-600', bgColor: 'bg-gray-100' };
        }
    };

    const StatusIcon = hrStatus ? getStatusInfo(hrStatus.hrStatus).icon : AlertCircle;
    const statusColor = hrStatus ? getStatusInfo(hrStatus.hrStatus).color : 'text-gray-600';
    const statusBgColor = hrStatus ? getStatusInfo(hrStatus.hrStatus).bgColor : 'bg-gray-100';

    const nextCvPage = () => {
        if (currentCvPage < cvPages.length - 1) {
            setCurrentCvPage(currentCvPage + 1);
        }
    };
    const prevCvPage = () => {
        if (currentCvPage > 0) {
            setCurrentCvPage(currentCvPage - 1);
        }
    };

    return (
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg sticky top-6">
            <h2 className="text-xl font-bold mb-4 text-black dark:text-white flex items-center gap-2">
                <SquareChartGantt className="w-6 h-6" />
                HR Application Status
            </h2>
            {hrStatus ? (
                <>
                    <div className={`rounded-lg p-4 mb-6 flex items-center gap-3 ${statusBgColor} dark:bg-gray-700`}>
                        <StatusIcon className={`w-6 h-6 ${statusColor} dark:text-gray-300`} />
                        <div>
                            <p className="font-medium text-black dark:text-white">Status: {hrStatus.hrStatus}</p>
                            <p className="text-sm text-gray-600 dark:text-gray-300">
                                {hrStatus.submittedAt ? new Date(hrStatus.submittedAt).toLocaleDateString('en-US') : ''}
                            </p>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <div className="flex items-start gap-3">
                            <Building2 className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                            <div>
                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Company</p>
                                <p className="text-black dark:text-white">{hrStatus.company || 'N/A'}</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <Phone className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                            <div>
                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Phone</p>
                                <p className="text-black dark:text-white">{hrStatus.phone || 'N/A'}</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <Globe className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                            <div>
                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Country</p>
                                <p className="text-black dark:text-white">{hrStatus.country || 'N/A'}</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <Calendar className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                            <div>
                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Experience</p>
                                <p className="text-black dark:text-white">{hrStatus.experienceYears} years</p>
                            </div>
                        </div>
                        {hrStatus.linkedinUrl && (
                            <div className="flex items-start gap-3">
                                <Linkedin className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                                <div>
                                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">LinkedIn</p>
                                    <a
                                        href={hrStatus.linkedinUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-600 dark:text-blue-400 hover:underline break-all"
                                    >
                                        {hrStatus.linkedinUrl}
                                    </a>
                                </div>
                            </div>
                        )}
                        {cvPages.length > 0 && (
                            <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
                                <div className="flex items-start gap-3 mb-3">
                                    <FileTextIcon className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                                    <div className="flex-1">
                                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">CV Preview</p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                                            Page {currentCvPage + 1} of {cvPages.length}
                                        </p>
                                    </div>
                                </div>
                                <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-2">
                                    <div className="relative flex justify-center items-center bg-white dark:bg-gray-600 rounded border border-gray-300 dark:border-gray-500 min-h-[200px]">
                                        <img
                                            src={cvPages[currentCvPage]}
                                            alt={`CV Page ${currentCvPage + 1}`}
                                            className="max-h-[180px] max-w-full object-contain"
                                        />
                                        {cvPages.length > 1 && (
                                            <>
                                                <button
                                                    onClick={prevCvPage}
                                                    disabled={currentCvPage === 0}
                                                    className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-800 dark:bg-gray-400 text-white dark:text-gray-800 rounded-full p-1 disabled:opacity-50"
                                                >
                                                    <ChevronLeft className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={nextCvPage}
                                                    disabled={currentCvPage === cvPages.length - 1}
                                                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-800 dark:bg-gray-400 text-white dark:text-gray-800 rounded-full p-1 disabled:opacity-50"
                                                >
                                                    <ChevronRight className="w-4 h-4" />
                                                </button>
                                            </>
                                        )}
                                    </div>
                                    <div className="flex justify-between items-center mt-2">
                                        <a
                                            href={cvPages[0]}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-sm text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
                                        >
                                            <Eye className="w-4 h-4" />
                                            View Full CV
                                        </a>
                                        {cvPages.length > 1 && (
                                            <div className="flex gap-1">
                                                {cvPages.map((_, index) => (
                                                    <button
                                                        key={index}
                                                        onClick={() => setCurrentCvPage(index)}
                                                        className={`w-2 h-2 rounded-full ${currentCvPage === index ? 'bg-blue-600 dark:bg-blue-400' : 'bg-gray-400 dark:bg-gray-500'}`}
                                                    />
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}
                        <div className="flex items-start gap-3">
                            <Calendar className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                            <div>
                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Submitted At</p>
                                <p className="text-black dark:text-white">
                                    {hrStatus.submittedAt ? new Date(hrStatus.submittedAt).toLocaleString('en-US') : 'N/A'}
                                </p>
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <div className="p-4 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-center">
                    You have not requested to become HR.
                </div>
            )}
        </div>
    );

};

export default HrApplicationStatus;
