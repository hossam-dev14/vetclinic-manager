import { useMemo, useState } from 'react';
import { Button } from '../../components/ui';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { useOwners, useDeleteOwner } from './hooks/useOwners';
import { AddOwnerModal } from './components/AddOwnerModal';
import { EditOwnerModal } from './components/EditOwnerModal';
import type { Owner } from './types';
import { DataTable } from '../../components/table/DataTable';
import type { ColumnDef } from '@tanstack/react-table';
import { Pagination } from '../../components/table/Pagination';
import { ConfirmModal } from '../../components/modals/ConfirmModal';
import { ContentHeader } from '../../components/layout/ContentHeader';

export function OwnersPage() {
  const { data: owners = [], isLoading, error } = useOwners();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingOwner, setEditingOwner] = useState<Owner | null>(null);
  const [deletingOwner, setDeletingOwner] = useState<Owner | null>(null);
  const { mutate: deleteOwner, isPending: isDeleting } = useDeleteOwner();
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  const totalPages = Math.max(1, Math.ceil(owners.length / pageSize));

  const paginatedOwners = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return owners.slice(start, start + pageSize);
  }, [owners, currentPage]);

  const columns: ColumnDef<Owner>[] = useMemo(
    () => [
      {
        header: 'Name',
        accessorKey: 'name',
        cell: ({ row }) => (
          <div className="flex items-center gap-3">
            <div className="h-7 w-7 rounded-md bg-[#E6F2FF]" />
            <span className="font-medium text-[#000000]">{row.original.name}</span>
          </div>
        ),
      },
      {
        header: 'Phone',
        accessorKey: 'phone',
        cell: ({ row }) => (
          <span className="text-[#666666]">{row.original.phone}</span>
        ),
      },
      {
        header: 'Email',
        accessorKey: 'email',
        cell: ({ row }) => (
          <span className="text-[#666666]">{row.original.email}</span>
        ),
      },
      {
        header: 'Address',
        accessorKey: 'address',
        cell: ({ row }) => (
          <span className="text-[#666666] truncate max-w-xs inline-block">
            {row.original.address}
          </span>
        ),
      },
      {
        header: '',
        id: 'actions',
        cell: ({ row }) => (
          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setEditingOwner(row.original)}
              aria-label={`Edit owner ${row.original.name}`}
            >
              <Pencil className="h-4 w-4" />
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => setDeletingOwner(row.original)}
              aria-label={`Delete owner ${row.original.name}`}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ),
      },
    ],
    []
  );

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading owners</div>;

  return (
    <div className="space-y-6">
      <ContentHeader
        title="Owners"
        description="Here&apos;s a quick overview of your clinic."
        action={
          <Button onClick={() => setIsModalOpen(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Add Owner
          </Button>
        }
      />

      <DataTable columns={columns} data={paginatedOwners} />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        hasNextPage={currentPage < totalPages}
        hasPreviousPage={currentPage > 1}
      />

      <AddOwnerModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      <EditOwnerModal
        isOpen={!!editingOwner}
        onClose={() => setEditingOwner(null)}
        owner={editingOwner}
      />

      <ConfirmModal
        isOpen={!!deletingOwner}
        onClose={() => setDeletingOwner(null)}
        onConfirm={() => {
          if (deletingOwner?.id) {
            deleteOwner(deletingOwner.id, {
              onSuccess: () => setDeletingOwner(null),
            });
          }
        }}
        title="Delete owner"
        message={
          deletingOwner
            ? `Are you sure you want to delete ${deletingOwner.name}? This action cannot be undone.`
            : 'Are you sure you want to delete this owner?'
        }
        confirmText="Delete"
        cancelText="Cancel"
        variant="destructive"
        isLoading={isDeleting}
      />
    </div>
  );
}
