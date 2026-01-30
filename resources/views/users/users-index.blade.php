<x-app-layout>

    @include('items-index', ['tableItems' => $tableItems, 'tableHeaders' => $tableHeaders, 'tableActions' => $tableActions])

</x-app-layout>