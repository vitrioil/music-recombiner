#!/bin/bash

http-server public/ --cors&
if [[ $1 == '-f' ]]; then
	sudo sysctl fs.inotify.max_user_watches=524288
	sudo sysctl -p
	echo "increased watches"
fi
npm start
