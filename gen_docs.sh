#!/bin/bash

> ./docs.md
cat ./docs.cat | while read file; do
    if [ -f "./$file" ]; then
	cat "./$file" >> docs.md
    fi
done
