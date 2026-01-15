import { DocumentCard } from '../../components/cards/DocumentCard';
import { ContentHeader } from '../../components/layout/ContentHeader';
import { useDocuments } from './hooks/useDocuments';

export function DocumentsPage() {
  const { data: documents = [], isLoading, error } = useDocuments();

  if (isLoading) {
    return <div className="p-4 text-center">Loading documents...</div>;
  }

  if (error) {
    return <div className="p-4 text-center text-red-500">Failed to fetch documents</div>;
  }

  return (
    <div className="space-y-6">
      <ContentHeader
        title="Documents"
        description="Track and manage your documents."
      />
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
}
