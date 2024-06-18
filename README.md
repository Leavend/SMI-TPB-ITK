Description-Github-SIM TPB

# System Management Information TPB-ITK

## Project Description

This project is aimed at developing a System Management Information (SMI) for TPB-ITK to efficiently manage and track various administrative tasks.

## Code Structure

The project is organized into the following directories and files:

SMI-TPB-ITK/
├── skaffold.yaml
├── auth-service
| ├── src
| | ├── controllers
| | | ├── role-controller.ts
| | | └── user-controller.ts
| | ├── database
| | | ├── index.ts
| | | └── init.ts
| | ├── datasources
| | | ├── dosen-datasource.ts
| | | ├── mahasiswa-datasource.ts
| | | ├── role-datasource.ts
| | | ├── tendik-datasource.ts
| | | ├── token-datasource.ts
| | | ├── user-datasource.ts
| | | └── user-role-datasource.ts
| | ├── interfaces
| | | ├── enum
| | | | ├── code-enum.ts
| | | | └── user-enum.ts
| | | ├── dosen-interface.ts
| | | ├── mahasiswa-interface.ts
| | | ├── role-interface.ts
| | | ├── tendik-interface.ts
| | | ├── token-interface.ts
| | | ├── user-interface.ts
| | | └── user-role-interface.ts
| | ├── middlewares
| | | └── index.middleware.ts
| | ├── models
| | | ├── dosen-model.ts
| | | ├── mahasiswa-model.ts
| | | ├── role-model.ts
| | | ├── tendik-model.ts
| | | ├── token-model.ts
| | | ├── user-model.ts
| | | └── user-role-model.ts
| | ├── permissions
| | | └── index.ts
| | ├── routers
| | | ├── role-router.ts
| | | └── user-router.ts
| | ├── services
| | | ├── consume-message-service.ts
| | | ├── dosen-service.ts
| | | ├── email-service.ts
| | | ├── mahasiswa-service.ts
| | | ├── message-service.ts
| | | ├── role-service.ts
| | | ├── tendik-service.ts
| | | ├── token-service.ts
| | | └── user-role-service.ts
| | | ├── user-service.ts
| | ├── templates
| | | └── email.html
| | ├── utils
| | | └── index.utils.ts
| | └── validators
| | | └── user-validator-schema.ts
| ├── .dockerignore
| ├── .gitignore
| ├── .prettier
| ├── Dockerfile
| ├── index.ts
| ├── package-lock.json
| ├── package.json
| └── tsconfig.json
├── infra-service
| ├── k8s
| | ├── config_secret
| | | ├── configmap-depl.yaml
| | | ├── configmap-rabbit.yaml
| | | ├── secretkey-depl.yaml
| | | └── secretkey-rabbit.yaml
| | ├── db
| | | ├── mysql-depl.yaml
| | | ├── mysql-srv.yaml
| | | ├── pv-depl.yaml
| | | └── pvc-depl.yaml
| | ├── rabbitmq
| | | ├── pv-depl.yaml
| | | ├── pvc-depl.yaml
| | | ├── rabbit-srv.yaml
| | | └── rabbit-stateful.yaml
| | ├── auth-service-depl.yaml
| | ├── auth-service-srv.yaml
| | └── ingress-srv.yaml

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/yourusername/SMI-TPB-ITK.git
    cd SMI-TPB-ITK
    ```

## Usage

1. Run the main application (Make sure you're done with skaffold set up):
    ```sh
    skaffold dev
    ```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) (Not Yet Licensed) file for details.
