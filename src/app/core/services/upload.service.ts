import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

// Serviço para envio das imagens
export class UploadService {

  // API da imgBB  
  private apiKey = 'ee41ba6f840bda5f19366cfd4504a69a'

  // Função que envia a foto e retorna uma URL
  uploadParaImgBB(file: File): Promise<string> {
    const formData = new FormData()
    formData.append('image', file)

    return fetch(`https://api.imgbb.com/1/upload?key=${this.apiKey}`, {
      method: 'POST',
      body: formData
    })
    .then(res => res.json())
    .then(data => data.data.url)
  }
}