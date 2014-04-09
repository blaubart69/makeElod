/*
 *	2014-03-06 Spindler Bernhard - initial
 * 	2014-04-03 Spindler Bernhard - changes WScript.Echo to "Textfile.WriteLine" because of a codepage problem.
 *	2014-04-09 Spindler Bernhard - if input file doesn't exists, just quit the script.
 */
//
//
//
var oFso = WScript.CreateObject("Scripting.FileSystemObject");
var inputfilename = WScript.Arguments(0);
//
// quit if inputfile doesn't exists
//
if ( ! oFso.FileExists(inputfilename) ) {
	WScript.Echo("Inputfile [" + inputfilename + "] does not exists. Quitting.");
	WScript.Quit(1);
}

var outputfilename = WScript.Arguments(1);
//
// !!! Attenzione !!! POS start at 1 !!!
//
var pos_start 	= 199;
var pos_end 	= 206;
//
//	create string of blanks
//
var blanks 		= "";
for (var i=0; i <= pos_end-pos_start; i++) {
	blanks += " ";
}
//
// process lines
//

var out = oFso.CreateTextFile(outputfilename, true);
eachLine( inputfilename, function(line) {
	out.WriteLine( 		line.substr(0, pos_start-1) 
					+ 	blanks 
					+	line.substr(pos_end) );
});
out.Close();
// ----------------------------------------------------------------------------
// utils
// ----------------------------------------------------------------------------
//
// process textfile line by line
//
function eachLine(filename, callback) {
	var oFso = WScript.CreateObject("Scripting.FileSystemObject");
	var file = oFso.OpenTextFile( filename );
	while ( !file.AtEndOfStream ) {
		callback( file.ReadLine() );
	}
	file.Close();
}
