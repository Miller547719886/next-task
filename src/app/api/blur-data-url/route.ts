import { NextRequest, NextResponse } from 'next/server';
import { getPlaiceholder } from 'plaiceholder';
import fs from 'node:fs/promises';
import path from 'node:path';

/**
 * API路由：生成图片的blur placeholder
 * 使用 plaiceholder 库为本地图片或远程图片生成低质量的模糊占位符
 * 
 * @param request - Next.js 请求对象
 * @returns 返回包含 base64 编码的 blur placeholder 的 JSON 响应
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const imageType = searchParams.get('type'); // 'default' 或 'remote'
    const src = searchParams.get('src'); // 远程图片的 URL
    
    let buffer: Buffer;
    
    if (imageType === 'default') {
      // 为默认头像生成 blur placeholder
      const defaultAvatarPath = path.join(process.cwd(), 'src/app/images/default_avatar.webp');
      buffer = await fs.readFile(defaultAvatarPath);
    } else if (imageType === 'remote' && src) {
      // 为远程图片生成 blur placeholder
      const response = await fetch(src);
      if (!response.ok) {
        throw new Error(`Failed to fetch image: ${response.statusText}`);
      }
      buffer = Buffer.from(await response.arrayBuffer());
    } else {
      return NextResponse.json(
        { error: 'Invalid parameters. Use type=default or type=remote with src parameter' },
        { status: 400 }
      );
    }
    
    // 使用 plaiceholder 生成 blur placeholder
    const { base64 } = await getPlaiceholder(buffer, {
      size: 10, // 生成非常小的图片以减少数据大小
    });
    
    return NextResponse.json({ 
      blurDataURL: base64,
      success: true 
    });
    
  } catch (error) {
    console.error('Error generating blur placeholder:', error);
    return NextResponse.json(
      { 
        error: 'Failed to generate blur placeholder',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
} 