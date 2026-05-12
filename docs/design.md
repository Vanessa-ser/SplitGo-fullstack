Diseño y Arquitectura de la Aplicación

    Estructura de Componentes
        La aplicación está dividida en componentes reutilizables para mantener el código limpio:

            App.tsx: El componente principal que gestiona el estado global y el layout.

            ExpenseForm.tsx: Componente especializado en la entrada de datos.

            Custom Hooks (useExpenses): He separado la lógica de los datos de la interfaz. Este hook se encarga de añadir, borrar y calcular el total gastado.

    Gestión del Estado
        El estado se gestiona principalmente con useState y useEffect.

            Persistencia: He decidido que los datos de configuración (presupuesto, participantes) vivan en el cliente usando LocalStorage, mientras que los gastos se gestionan a través del hook para asegurar que la UI se actualice al instante.

    Flujo de Datos
        El flujo es unidireccional:

            El usuario introduce un gasto en ExpenseForm.

            El formulario envía el objeto al hook useExpenses.

            El estado de la lista de gastos cambia, lo que dispara un recalculo automático de los balances y las deudas en App.tsx.

            La interfaz se renderiza con los nuevos datos.