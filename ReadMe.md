# Notes

## Client application

### Minikube - create ClusterIP for ingress

```sh
kubectl expose deployment nginx-ingress-controller --type=ClusterIP -n kube-system
#this helps accessing ingress over DNS: http://nginx-ingress-controller.kube-system/
```
