install:
	@npm ci
	npm link  # install local packages

# publish:
# 	npm publish --dry-run

gendiff:
		node bin/gendiff.js -h

lint:
	npx eslint . --fix

.PHONY: install gendiff lint