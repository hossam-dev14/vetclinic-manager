import React from 'react';
import type { Document, Animal } from '../../lib/validators';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { FileTextIcon } from 'lucide-react'; // Assuming Lucide icons are used

interface DocumentCardProps {
  document: Document & { animal?: Animal };
}

export const DocumentCard: React.FC<DocumentCardProps> = ({ document }) => {
  return (
    <Card className="flex flex-col h-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          <FileTextIcon className="h-4 w-4 text-muted-foreground inline-block mr-2" />
          {document.name}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{document.animal?.name || 'N/A'}</div>
        <p className="text-xs text-muted-foreground">
          Associated Animal
        </p>
      </CardContent>
    </Card>
  );
};
