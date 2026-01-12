import React, { useEffect, useState } from 'react';
import { DocumentCard } from '../../components/cards/DocumentCard';
import { getDocumentsWithAnimals } from '../../lib/api';
import { Document, Animal } from '../../lib/validators'; // Import Document and Animal types

interface DocumentWithAnimal extends Document {
  animal?: Animal;
}

export const DocumentsPage: React.FC = () => {
  const [documents, setDocuments] = useState<DocumentWithAnimal[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const data = await getDocumentsWithAnimals();
        setDocuments(data);
      } catch (err) {
        setError('Failed to fetch documents');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDocuments();
  }, []);

  if (loading) {
    return <div className="p-4 text-center">Loading documents...</div>;
  }

  if (error) {
    return <div className="p-4 text-center text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Documents</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {documents.map((document) => (
          <DocumentCard key={document.id} document={document} />
        ))}
      </div>
      {documents.length === 0 && (
        <div className="text-center text-gray-500 mt-8">No documents found.</div>
      )}
    </div>
  );
};
