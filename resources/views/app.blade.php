<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">


    @if (app()->environment('local'))
        <!-- 開発環境用 -->

        @viteReactRefresh
        @vite(['resources/ts/app/app.tsx'])

	@else
        <!-- 本番環境用 -->
        @php
	$manifestPath = public_path('build/manifest.json');
            if (file_exists($manifestPath)) {
                $manifest = json_decode(file_get_contents($manifestPath), true);
            } else {
                throw new Exception('The Vite manifest file does not exist.');
            }
        
        $jsFile = $manifest['resources/ts/app/app.tsx']['file'] ?? null;
        $cssFiles = $manifest['resources/ts/app/app.tsx']['css'] ?? [];
        @endphp
        @foreach ($cssFiles as $cssFile)
            <link rel="stylesheet" href="{{ asset('build/' . $cssFile) }}">
        @endforeach
        @if ($jsFile)
            <script src="{{ asset('build/' . $jsFile) }}" defer></script>
        @endif
    @endif
</head>

<body>
    <div id="app"></div>
</body>

</html>