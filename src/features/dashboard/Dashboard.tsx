import { Card, CardContent, CardTitle } from '../../components/ui/Card';
import { useAnimals } from '../animals/hooks/useAnimals';
import { useConsultations } from '../consultations/hooks/useConsultations';
import { useDocuments } from '../documents/hooks/useDocuments';

export function Dashboard() {
  const { data: animals, isLoading: loadingAnimals } = useAnimals();
  const { data: consultations, isLoading: loadingConsultations } = useConsultations();
  const { data: documents, isLoading: loadingDocuments } = useDocuments();

  return (
    <div className="space-y-8 bg-[#F8F8F8] p-6 rounded-lg">
      <div>
        <h1 className="text-3xl font-bold text-[#000000]">Welcome back, Joe!</h1>
        <p className="text-[#666666] mt-2">Here's what's happening in your clinic today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Animals Card */}
        <Card className="bg-[#007BFF] text-white border-none shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
          <CardContent className="p-6 flex flex-col justify-between h-[160px]">
            <div>
              <p className="text-sm font-medium opacity-80">Total Animals</p>
              <CardTitle className="text-5xl font-bold mt-2">
                {loadingAnimals ? '...' : animals?.length || 0}
              </CardTitle>
            </div>
            <div className="flex items-center text-sm opacity-80">
              <span>+12% from last month</span>
            </div>
          </CardContent>
        </Card>

        {/* Consultations Card */}
        <Card className="bg-white text-[#000000] border border-[#ECECEC] shadow-sm hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="p-6 flex flex-col justify-between h-[160px]">
            <div>
              <p className="text-sm font-medium text-[#666666]">Consultations</p>
              <CardTitle className="text-5xl font-bold mt-2 text-[#000000]">
                {loadingConsultations ? '...' : consultations?.length || 0}
              </CardTitle>
            </div>
            <div className="flex items-center text-sm text-[#28A745]">
              <span>+5% from last month</span>
            </div>
          </CardContent>
        </Card>

        {/* Documents Card */}
        <Card className="bg-white text-[#000000] border border-[#ECECEC] shadow-sm hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="p-6 flex flex-col justify-between h-[160px]">
            <div>
              <p className="text-sm font-medium text-[#666666]">Documents</p>
              <CardTitle className="text-5xl font-bold mt-2 text-[#000000]">
                {loadingDocuments ? '...' : documents?.length || 0}
              </CardTitle>
            </div>
            <div className="flex items-center text-sm text-[#666666]">
              <span>Files stored securely</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <CardTitle className="mb-4">Recent Activity</CardTitle>
          <div className="text-sm text-[#666666] italic">Coming soon...</div>
        </Card>

        <Card className="p-6">
          <CardTitle className="mb-4">Upcoming Appointments</CardTitle>
          <div className="text-sm text-[#666666] italic">Coming soon...</div>
        </Card>
      </div>
    </div>
  );
}
