export const valueCalculation = (destination: string, value: string) => {
    let numericValue = Number(value.replace(/\D/g, ""));

    if(destination == "Amazônia"){
      numericValue = numericValue * 1.2;
    }
    else if(destination == "Argentina"){
      numericValue = numericValue * 1.4;
    }
    else if(destination == "Nordeste"){
      numericValue = numericValue * 1.3;
    }

    const formattedValue = (Number(numericValue) / 100).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });

    return formattedValue;
  };

  export const formatDate = (dateString: string) => {
    const date = new Date(dateString); 
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear(); 
  
    return `${day}/${month}/${year}`; 
  }

    export const formatCurrency = (value: string) => {
      const numericValue = value.replace(/\D/g, "");
  
      const formattedValue = (Number(numericValue) / 100).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      });
  
      return formattedValue;
    };
  
    export function parseCurrencyToNumber(value: string): number {
        const cleanedValue = value.replace("R$", "").replace(/\s+/g, "").replace(".", "").replace(",", ".");
        const numericValue = parseFloat(cleanedValue);
        return isNaN(numericValue) ? 0 : numericValue;
    }

    export const typeOptions = ["Eletrônicos", "Combustível", "Comum"];

    export const secureOptions = ["Não", "Sim"];

    export const destinationOptions = [
      "Nordeste",
      "Sudeste",
      "Sul",
      "Centro-oeste",
      "Amazônia",
      "Argentina",
    ];

    export const formatFloatToCurrency = (value: number): string => {
        return value.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        });
      };

    