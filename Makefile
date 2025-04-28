.PHONY: package default


default: package

package:
	zip -r -FS ../ytqsad.zip . --exclude '*.git*'