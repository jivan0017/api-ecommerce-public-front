# ECOMMERCE LOCAL - LANDING PAGE
- generación de componentes en común:
ng g c shared/header --skip-tests
ng g c shared/footer --skip-tests

ng g c pages/home --skip-tests

# Login: 
ng g c pages/auth/login --skip-tests
ng g c pages/auth/register --skip-tests

ng g s pages/auth/service/auth --skip-tests
ng g g pages/auth/service/guard --skip-tests

# Enviroments:
- generación
ng generate environments
