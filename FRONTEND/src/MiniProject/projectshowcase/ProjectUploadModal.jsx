import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useAuth } from '../../Login/AuthContext';

const ProjectUploadModal = ({ isOpen, onClose, onProjectSubmitted }) => {
  const initialState = { title: '', shortDescription: '', fullDescription: '', techStack: '', githubLink: '', demoLink: '' };
  const [formData, setFormData] = useState(initialState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const { currentUser } = useAuth();

  const handleChange = (e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    const submissionData = {
      ...formData,
      techStack: formData.techStack.split(',').map(s => s.trim()).filter(Boolean),
      userName: currentUser?.displayName || 'An anonymous user',
    };

    try {
      // --- THIS IS THE CORRECTED LINE ---
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/projects`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submissionData),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || 'An error occurred.');
      
      onProjectSubmitted(result);
      setFormData(initialState);
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50 p-4">
      <div className="bg-gray-900 border border-gray-700 rounded-xl w-full max-w-lg">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-yellow-400">Upload Project</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-white"><X size={24} /></button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input name="title" placeholder="Title *" value={formData.title} onChange={handleChange} className="w-full p-2.5 rounded-md bg-gray-800 border border-gray-600 focus:ring-2 focus:ring-yellow-500" />
            <input name="shortDescription" placeholder="Short Description *" value={formData.shortDescription} onChange={handleChange} className="w-full p-2.5 rounded-md bg-gray-800 border border-gray-600 focus:ring-2 focus:ring-yellow-500" />
            <textarea name="fullDescription" placeholder="Full Description (Optional)" value={formData.fullDescription} onChange={handleChange} rows={3} className="w-full p-2.5 rounded-md bg-gray-800 border border-gray-600 focus:ring-2 focus:ring-yellow-500" />
            <input name="techStack" placeholder="Tech Stack (comma-separated) *" value={formData.techStack} onChange={handleChange} className="w-full p-2.5 rounded-md bg-gray-800 border border-gray-600 focus:ring-2 focus:ring-yellow-500" />
            <input name="demoLink" type="url" placeholder="Live Demo Link (Optional)" value={formData.demoLink} onChange={handleChange} className="w-full p-2.5 rounded-md bg-gray-800 border border-gray-600 focus:ring-2 focus:ring-yellow-500" />
            <input name="githubLink" type="url" placeholder="GitHub Link (Optional)" value={formData.githubLink} onChange={handleChange} className="w-full p-2.5 rounded-md bg-gray-800 border border-gray-600 focus:ring-2 focus:ring-yellow-500" />
            
            {error && <p className="text-red-500 text-sm">{error}</p>}
            
            <div className="flex justify-end gap-4 pt-2">
              <button type="button" onClick={onClose} className="py-2 px-4 rounded-md bg-gray-700 hover:bg-gray-600">Cancel</button>
              <button type="submit" disabled={isSubmitting} className="py-2 px-5 rounded-md bg-yellow-500 text-black font-semibold disabled:bg-gray-500">
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProjectUploadModal;