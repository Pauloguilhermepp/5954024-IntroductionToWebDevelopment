# style.sh
#!/bin/bash

find src/ -name "*.ts" -exec tsfmt --replace {} \;

echo "Formatting complete."
