using be.entities;
using System.Runtime.CompilerServices;

namespace be.utils
{
    public static class FieldDefinitions
    {
        public static Dictionary<string, List<FormField>> Fields = new Dictionary<string, List<FormField>>
    {
        {
            "szinek", new List<FormField>
            {
                new FormField { LabelName = "Szin", PropertyName = "szin", DataType = typeof(string) },
            }
        },
        {
            "meretek", new List<FormField>
            {
                new FormField { LabelName = "Méret", PropertyName = "meret", DataType = typeof(string) },
            }
        },
        {
            "varosok", new List<FormField>
            {
                new FormField { LabelName = "Város Neve", PropertyName = "varos", DataType = typeof(string) },
                new FormField { LabelName = "Irányitószám", PropertyName = "iranyitosz", DataType = typeof(string) },
            }
        },
        {
            "markak", new List<FormField>
            {
                new FormField { LabelName = "Márka Neve", PropertyName = "nev", DataType = typeof(string) },
            }
        },
        {
            "vasarlok", new List<FormField>
            {
                new FormField { LabelName = "Családnev", PropertyName = "csaladnev", DataType = typeof(string) },
                new FormField { LabelName = "Keresztnév", PropertyName = "keresztnev", DataType = typeof(string) },
                new FormField { LabelName = "Email", PropertyName = "email", DataType = typeof(string) },
                new FormField { LabelName = "Telefon", PropertyName = "telefonsz", DataType = typeof(string) },
                new FormField { LabelName = "Utca", PropertyName = "utca", DataType = typeof(string) },
                new FormField { LabelName = "Iranyitószám", PropertyName = "iranyitosz", DataType = typeof(string) },
                new FormField { LabelName = "Státusz", PropertyName = "status", DataType = typeof(string) },
            }
        },
        {
            "fizetes", new List<FormField>
            {
                new FormField { LabelName = "Fizetés Ideje", PropertyName = "fizetes_ideje", DataType = typeof(DateTime) },
                new FormField { LabelName = "Összeg", PropertyName = "osszeg", DataType = typeof(string) },
                new FormField { LabelName = "Fizetés Mód", PropertyName = "fizetesi_mod", DataType = typeof(string) },
            }
        },
        {
            "rendeles", new List<FormField>
{
                new FormField { LabelName = "Rendelés Ideje", PropertyName = "rendeles_ideje", DataType = typeof(DateTime) },
                new FormField { LabelName = "Email", PropertyName = "email", DataType = typeof(string) },
                new FormField { LabelName = "Keresztnév", PropertyName = "keresztnev", DataType = typeof(string) },
                new FormField { LabelName = "Családnév", PropertyName = "csaladnev", DataType = typeof(string) }
}
            },
            {
                "termekview", new List<FormField>
            {
                new FormField { LabelName = "Termék ID", PropertyName = "TermekID", DataType = typeof(string) },
                new FormField { LabelName = "Ár", PropertyName = "TermekAr", DataType = typeof(string) },
                new FormField { LabelName = "Szín", PropertyName = "Szín", DataType = typeof(string) },
                new FormField { LabelName = "Méret", PropertyName = "Meret", DataType = typeof(string) },
                new FormField { LabelName = "Készlet", PropertyName = "Készlet", DataType = typeof(string) },
                new FormField { LabelName = "Márka", PropertyName = "Marka", DataType = typeof(string) },
            }
            },
            {
                "szamla", new List<FormField>
            {   
                   
                    new FormField {LabelName = "Dátum", PropertyName = "date", DataType = typeof(DateTime)},
                    new FormField {LabelName = "Számlaszám", PropertyName ="szamla_sorszam", DataType = typeof(string)},
                    new FormField {LabelName = "Fizetés mód" , PropertyName ="fizetes_mod_id", DataType = typeof(string)},


            }
            },
            {
                "rendelestermek_view", new List<FormField>
            {
                 new FormField {LabelName = "Rendelés Részlet", PropertyName = "rendel_reszletek", DataType= typeof(string)},
                 new FormField  {LabelName = "Dátum", PropertyName = "rendel_datum", DataType = typeof (DateTime)},
                 new FormField {LabelName = "Termék neve", PropertyName = "termek_nev" , DataType= typeof(string)},
                 new FormField {LabelName = "Termék ára", PropertyName = "termek_ar", DataType = typeof(string)},
                 new FormField {LabelName = "Mennyiség", PropertyName = "mennyiseg", DataType = typeof(string)},
                 

            }
            },
            {
                "keszlet_valtozas", new List<FormField>
                {
                    new FormField {LabelName = "Változás tipusa" , PropertyName = "valtozas_tipusa", DataType = typeof(string)},
                    new FormField {LabelName = "Termék", PropertyName = "termek_id", DataType = typeof(string)},
                    new FormField {LabelName = "Mennyiség", PropertyName = "mennyiseg", DataType = typeof(string)},
                    new FormField {LabelName = "Dátum", PropertyName = "date",DataType = typeof(DateTime)},
                }
            },
            {
                "fizetes_mod", new List<FormField>
                {
                    new FormField {LabelName = "Fizetési mód", PropertyName = "nev", DataType = typeof(string)},
                }
            }           
        };  
    }
}
