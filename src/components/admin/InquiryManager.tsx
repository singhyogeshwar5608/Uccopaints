import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { FaTrash, FaEye } from 'react-icons/fa';
import { getDocuments, updateDocument, deleteDocument } from '../../firebase/firestore';
import { formatDateTime } from '../../utils/helpers';
import LoadingSpinner from '../common/LoadingSpinner';

interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  subject?: string;
  status: 'new' | 'read' | 'replied';
  createdAt: { seconds: number };
}

const InquiryManager: React.FC = () => {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');

  useEffect(() => {
    fetchInquiries();
  }, []);

  const fetchInquiries = async () => {
    try {
      const data = await getDocuments('inquiries', []);
      setInquiries(data as Inquiry[]);
    } catch (error) {
      toast.error('Failed to fetch inquiries');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (inquiry: Inquiry, newStatus: 'new' | 'read' | 'replied') => {
    try {
      await updateDocument('inquiries', inquiry.id, { status: newStatus });
      toast.success('Status updated successfully!');
      fetchInquiries();
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  const handleDelete = async (inquiry: Inquiry) => {
    if (!window.confirm('Are you sure you want to delete this inquiry?')) return;

    try {
      await deleteDocument('inquiries', inquiry.id);
      toast.success('Inquiry deleted successfully!');
      fetchInquiries();
      if (selectedInquiry?.id === inquiry.id) {
        setSelectedInquiry(null);
      }
    } catch (error) {
      toast.error('Failed to delete inquiry');
    }
  };

  const filteredInquiries = filterStatus === 'all' 
    ? inquiries 
    : inquiries.filter(inq => inq.status === filterStatus);

  if (loading) return <LoadingSpinner />;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Inquiry Management</h1>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="input-field w-48"
        >
          <option value="all">All Inquiries</option>
          <option value="new">New</option>
          <option value="read">Read</option>
          <option value="replied">Replied</option>
        </select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Inquiry List */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Contact</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredInquiries.map((inquiry) => (
                  <tr 
                    key={inquiry.id}
                    className={`cursor-pointer hover:bg-gray-50 ${selectedInquiry?.id === inquiry.id ? 'bg-blue-50' : ''}`}
                    onClick={() => setSelectedInquiry(inquiry)}
                  >
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">{inquiry.name}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">{inquiry.email}</div>
                      <div className="text-sm text-gray-500">{inquiry.phone}</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {formatDateTime(inquiry.createdAt)}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`badge ${
                        inquiry.status === 'new' ? 'badge-error' :
                        inquiry.status === 'read' ? 'badge-warning' :
                        'badge-success'
                      }`}>
                        {inquiry.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedInquiry(inquiry);
                        }}
                        className="text-blue-600 hover:text-blue-900 mr-4"
                      >
                        <FaEye />
                      </button>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(inquiry);
                        }}
                        className="text-red-600 hover:text-red-900"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filteredInquiries.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              No inquiries found
            </div>
          )}
        </div>

        {/* Inquiry Details */}
        <div className="lg:col-span-1">
          {selectedInquiry ? (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Inquiry Details</h2>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Name</label>
                  <p className="text-gray-900">{selectedInquiry.name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Email</label>
                  <p className="text-gray-900">{selectedInquiry.email}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Phone</label>
                  <p className="text-gray-900">{selectedInquiry.phone}</p>
                </div>
                {selectedInquiry.subject && (
                  <div>
                    <label className="text-sm font-medium text-gray-500">Subject</label>
                    <p className="text-gray-900">{selectedInquiry.subject}</p>
                  </div>
                )}
                <div>
                  <label className="text-sm font-medium text-gray-500">Message</label>
                  <p className="text-gray-900 whitespace-pre-wrap">{selectedInquiry.message}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Date</label>
                  <p className="text-gray-900">{formatDateTime(selectedInquiry.createdAt)}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500 block mb-2">Status</label>
                  <select
                    value={selectedInquiry.status}
                    onChange={(e) => handleStatusChange(selectedInquiry, e.target.value as any)}
                    className="input-field"
                  >
                    <option value="new">New</option>
                    <option value="read">Read</option>
                    <option value="replied">Replied</option>
                  </select>
                </div>
                <div className="pt-4 border-t">
                  <a
                    href={`mailto:${selectedInquiry.email}?subject=Re: ${selectedInquiry.subject || 'Your Inquiry'}`}
                    className="btn-primary w-full text-center block"
                  >
                    Reply via Email
                  </a>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-md p-6 text-center text-gray-500">
              Select an inquiry to view details
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InquiryManager;
