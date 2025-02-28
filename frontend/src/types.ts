export interface Subscription {
    _id: string;
    name: string;
    price: number;
    currency: string;
    status: string;
    createdAt: string;
    updatedAt: string; 
    renewalDate: string; 
  }
  
  export interface SearchAndFilterProps {
    onSearch: (term: string) => void;
    onFilter: (filterBy: string) => void;
  }