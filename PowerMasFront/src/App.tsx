import { useState } from 'react';
import { BeneficiarioForm } from './components/beneficiarios/BeneficiarioForm'
import { BeneficiarioList } from './components/beneficiarios/BeneficiarioList'
import type { Beneficiario } from './types/types';

function App() {
  const [beneficiarioEditar, setBeneficiarioEditar] = useState<Beneficiario | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleSuccess = () => {
    setRefreshKey(prev => prev + 1);
    setBeneficiarioEditar(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center text-blue-800 mb-10">
          PowerMas - Gestión de Beneficiarios
        </h1>
        
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          <div>
            <BeneficiarioForm 
              onSuccess={handleSuccess} 
              beneficiarioAEditar={beneficiarioEditar}
              onCancel={() => setBeneficiarioEditar(null)}
            />
          </div>

          <div>
            <BeneficiarioList 
              key={refreshKey} 
              onEdit={(b) => setBeneficiarioEditar(b)} 
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App
