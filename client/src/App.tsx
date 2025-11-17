import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ContractProvider } from "@/lib/contractContext";
import CategorySelection from "@/pages/CategorySelection";
import DocumentIngestion from "@/pages/DocumentIngestion";
import AnalysisReport from "@/pages/AnalysisReport";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={CategorySelection} />
      <Route path="/analyze" component={DocumentIngestion} />
      <Route path="/analysis" component={AnalysisReport} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <ContractProvider>
          <Toaster />
          <Router />
        </ContractProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
