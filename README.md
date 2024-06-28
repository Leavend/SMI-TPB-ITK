---

# Infra Service

## Project Description

The Infra Service is an essential part of the System Management Information (SMI) for TPB-ITK, providing the necessary infrastructure and configuration management required for seamless operation and integration of various services. This service is responsible for managing deployment configurations, database setups, and message broker configurations.

### Key Features

- **Kubernetes Configurations:** Manages Kubernetes configurations for deploying various services.
- **Database Management:** Provides configurations for setting up and managing databases.
- **Message Broker Configuration:** Manages RabbitMQ configurations for service communication.
- **Service Deployment:** Handles deployment configurations for the auth-service and other components.
- **Secret Management:** Manages secrets and sensitive information securely.

### Objectives

- **Automation:** Automate the deployment and management of infrastructure components.
- **Scalability:** Ensure the infrastructure can scale with the increasing demands of the SMI-TPB-ITK system.
- **Reliability:** Provide a stable and reliable infrastructure setup for all services.

### Technology Stack

- **Configuration Management:** Kubernetes, YAML
- **Database:** MySQL
- **MessageBroker:** RabbitMQ
- **Deployment:** Docker, Kubernetes

### Directory Structure

```
infra-service/
├── k8s
|   ├── config_secret
|   |   ├── configmap-depl.yaml
|   |   ├── configmap-rabbit.yaml
|   |   ├── secretkey-depl.yaml
|   |   └── secretkey-rabbit.yaml
|   ├── db
|   |   ├── mysql-depl.yaml
|   |   ├── mysql-srv.yaml
|   |   ├── pv-depl.yaml
|   |   └── pvc-depl.yaml
|   ├── rabbitmq
|   |   ├── pv-depl.yaml
|   |   ├── pvc-depl.yaml
|   |   ├── rabbit-srv.yaml
|   |   └── rabbit-stateful.yaml
|   ├── auth-service-depl.yaml
|   ├── auth-service-srv.yaml
|   └── ingress-srv.yaml
```

### Getting Started

To get started with the Infra Service, follow these steps:

1. **Clone the Repository:**
    ```sh
    git clone https://github.com/Leavend/SMI-TPB-ITK.git
    ```

2. **Navigate to the Infra Service Directory:**
    ```sh
    cd SMI-TPB-ITK/infra-service
    ```

3. **Set Up Kubernetes:**
    Ensure you have Kubernetes and kubectl installed and configured on your local machine or server.

4. **Deploy Configurations:**
    Apply the Kubernetes configurations:
    ```sh
    kubectl apply -f k8s/config_secret/configmap-depl.yaml
    kubectl apply -f k8s/config_secret/configmap-rabbit.yaml
    kubectl apply -f k8s/config_secret/secretkey-depl.yaml
    kubectl apply -f k8s/config_secret/secretkey-rabbit.yaml
    kubectl apply -f k8s/db/mysql-depl.yaml
    kubectl apply -f k8s/db/mysql-srv.yaml
    kubectl apply -f k8s/db/pv-depl.yaml
    kubectl apply -f k8s/db/pvc-depl.yaml
    kubectl apply -f k8s/rabbitmq/pv-depl.yaml
    kubectl apply -f k8s/rabbitmq/pvc-depl.yaml
    kubectl apply -f k8s/rabbitmq/rabbit-srv.yaml
    kubectl apply -f k8s/rabbitmq/rabbit-stateful.yaml
    kubectl apply -f k8s/auth-service-depl.yaml
    kubectl apply -f k8s/auth-service-srv.yaml
    kubectl apply -f k8s/ingress-srv.yaml
    ```

### Contact

For any questions or support, please reach out to the project maintainers at [support@tpb-itk.ac.id](mailto:support@tpb-itk.ac.id).

---
