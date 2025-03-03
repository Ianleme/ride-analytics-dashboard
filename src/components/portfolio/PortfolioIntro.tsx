
import { useState, useEffect } from "react";
import { X, Info, ExternalLink, Code, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface PortfolioIntroProps {
  onClose: () => void;
}

export function PortfolioIntro({ onClose }: PortfolioIntroProps) {
  // Animation state
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger animation after component mounts
    setIsVisible(true);
    
    // Add a class to the body to prevent scrolling while overlay is active
    document.body.classList.add("overflow-hidden");
    
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    // Delay the actual removal to allow for fade-out animation
    setTimeout(onClose, 300);
  };

  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <Card className={`relative w-full max-w-3xl max-h-[90vh] overflow-auto bg-white p-6 shadow-xl transition-all duration-300 ${
        isVisible ? "translate-y-0 scale-100" : "translate-y-4 scale-95"
      }`}>
        <button 
          onClick={handleClose} 
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-secondary transition-colors"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>
        
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-1">
            <Info className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-bold text-foreground">Projeto de Portfólio</h2>
          </div>
          <div className="h-1 w-20 bg-primary rounded-full mb-4"></div>
          <p className="text-sm text-muted-foreground">Visualização interativa de dados de bike-sharing</p>
        </div>
        
        <div className="space-y-4 mb-6">
          <div>
            <h3 className="text-md font-semibold mb-2 text-foreground">Objetivo do Dashboard</h3>
            <p className="text-sm text-muted-foreground">
              Este dashboard foi criado como parte de um projeto de portfólio para demonstrar habilidades em desenvolvimento front-end, análise de dados e visualização. Ele apresenta uma interface para monitoramento de um sistema de compartilhamento de bicicletas.
            </p>
          </div>
          
          <div>
            <h3 className="text-md font-semibold mb-2 text-foreground">Fonte dos Dados</h3>
            <p className="text-sm text-muted-foreground">
              Os dados utilizados são sintéticos, baseados em padrões reais de uso de sistemas de bike-sharing em grandes cidades. Em um ambiente de produção, estes dados seriam obtidos através de APIs e atualizados em tempo real.
            </p>
          </div>
          
          <div>
            <h3 className="text-md font-semibold mb-2 text-foreground">Tecnologias Utilizadas</h3>
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium">React</span>
              <span className="inline-flex items-center rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium">TypeScript</span>
              <span className="inline-flex items-center rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium">Tailwind CSS</span>
              <span className="inline-flex items-center rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium">Recharts</span>
              <span className="inline-flex items-center rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium">Shadcn UI</span>
            </div>
          </div>
          
          <div>
            <h3 className="text-md font-semibold mb-2 text-foreground">Funcionalidades</h3>
            <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
              <li>Visualização de KPIs e métricas de desempenho</li>
              <li>Análise de tendências e padrões de uso</li>
              <li>Mapa de calor de demanda por horário</li>
              <li>Análise de rotas populares</li>
              <li>Filtros por período, tipo de usuário e tipo de bicicleta</li>
            </ul>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-border">
          <Button className="flex-1" onClick={handleClose}>
            Explorar o Dashboard
          </Button>
          <Button variant="outline" className="flex-1 gap-2">
            <Github className="h-4 w-4" />
            <span>Ver Código-Fonte</span>
          </Button>
          <Button variant="outline" className="flex-1 gap-2">
            <ExternalLink className="h-4 w-4" />
            <span>Mais Projetos</span>
          </Button>
        </div>
      </Card>
    </div>
  );
}
