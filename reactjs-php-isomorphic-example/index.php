<?php
$v8 = new V8Js();
$props = [
  'data' => [
    [1,2,3],
    [4,5,6],
    [7,8,9]
  ]
];
$propsJson = json_encode($props);
$react = [
       file_get_contents(__DIR__.'/node_modules/react/dist/react.min.js'),
	     file_get_contents(__DIR__.'/node_modules/react-dom/dist/react-dom-server.min.js'),
       file_get_contents(__DIR__.'/build/app.js'),
       'ReactDOMServer.renderToString(React.createElement(App, ' . $propsJson . '))'
];

try {
	$reactStr = $v8->executeString(implode(PHP_EOL, $react));
} catch (Exception $e) {
	echo '<h1>', $e->getMessage(), '</h1>';
	echo '<pre>', $e->getTraceAsString(), '</pre>';
	exit;
}

?>
<!doctype html>
<html>
  <head>
    <title>React page</title>
  </head>
  <body>
    <!-- render server content here -->
    <div id="app"><?= $reactStr; ?></div>
    <!-- load react and app code -->
    <script src="./node_modules/react/dist/react.js"></script>
    <script src="./node_modules/react-dom/dist/react-dom.js"></script>
    <script src="./build/app.js?t=<?= time(); ?>"></script>
    <script>
    ReactDOM.render(
      React.createElement(App, <?= $propsJson; ?>), document.getElementById('app')
    );
    </script>
  </body>
</html>
