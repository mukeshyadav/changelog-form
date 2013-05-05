Changelog Form
==============
A jQuery plugin that simplifies your Form log changes, It will help to track your form changes, before submiting.

How to use
-----------
$('form').changelog();

$('form').changelog({
    <br />'changeClass': 'change', 
    <br />'initialClass': 'initial', //use to track intial field value
    <br />'highlighter': 'highlighter', //use to highlight the change field
    <br />'overlay': 'overlay', //pop-up styling
<br />});


Status
------
This project is stable to use, but there are few releases coming soon! Stay tuned!

Availability
------------
As of writing, Changelog form track only following form fields changes

* Input
* Radio Buttons
* Checkboxes
* Select Dropdown, not multiple selects

Plan
----
Future plan includes:

* Supporting multiple selects
* Textareas 
* Enhance highlighter
* Update Overlay

License
-------
Copyright 2013, Mukesh Yadav <br />
Release under GPL license (http://en.wikipedia.org/wiki/GPL)
